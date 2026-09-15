"use client";

import { ConstellationField } from "@designcodeio/threeui/components/ConstellationField";

export function ConstellationHero() {
  return <div className="shader-frame" aria-hidden="true"><ConstellationField variant="particle-network" mode="dark" speed={1} size={1} length={1} density={1} opacity={1} hue={0} saturation={1} brightness={1}/></div>;
}
