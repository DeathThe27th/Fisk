"use client";

import { motion, useReducedMotion } from "motion/react";

const sources = [
  { label: "NEWS", x: 61, y: 12, color: "#6857f5" },
  { label: "PRICE", x: 78, y: 29, color: "#dd6b48" },
  { label: "FILINGS", x: 82, y: 53, color: "#168b76" },
  { label: "RTOKEN", x: 69, y: 75, color: "#c39a32" },
  { label: "MACRO", x: 45, y: 83, color: "#5576a8" },
];

export function HeroObservatory() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="observatory" aria-label="A question splits into evidence from price, news, filings, tokenized markets, and macro context">
      <div className="observatory-orbit orbit-one" />
      <div className="observatory-orbit orbit-two" />
      <div className="observatory-origin">
        <span>?</span>
        <small>YOUR QUESTION</small>
      </div>
      <motion.div
        className="evidence-beam"
        initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      />
      {sources.map((source, index) => (
        <motion.div
          className="source-node"
          key={source.label}
          style={{ left: `${source.x}%`, top: `${source.y}%`, "--node-color": source.color } as React.CSSProperties}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 + index * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <i />
          <span>{source.label}</span>
        </motion.div>
      ))}
      <motion.div
        className="signal-card"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <small>THESIS / EVIDENCE QUALITY</small>
        <strong>Constructive, conditional</strong>
        <div><span style={{ width: "72%" }} /></div>
        <p>4 sources agree · 1 unresolved signal</p>
      </motion.div>
    </div>
  );
}
