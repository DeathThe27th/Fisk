"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/** A lightweight full-bleed shader surface for editorial hero backgrounds. */
export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    geometry: THREE.PlaneGeometry
    material: THREE.ShaderMaterial
    renderer: THREE.WebGLRenderer
    animationId: number
  } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);

        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) /
              abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    } catch {
      geometry.dispose()
      material.dispose()
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.setAttribute("aria-hidden", "true")
    container.appendChild(renderer.domElement)

    const resize = () => {
      const width = Math.max(1, container.clientWidth)
      const height = Math.max(1, container.clientHeight)
      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }

    const animate = () => {
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
      sceneRef.current!.animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    sceneRef.current = { geometry, material, renderer, animationId: requestAnimationFrame(animate) }

    return () => {
      window.removeEventListener("resize", resize)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.renderer.dispose()
        sceneRef.current.geometry.dispose()
        sceneRef.current.material.dispose()
        sceneRef.current.renderer.domElement.remove()
        sceneRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className="shader-animation-root" aria-hidden="true" />
}
