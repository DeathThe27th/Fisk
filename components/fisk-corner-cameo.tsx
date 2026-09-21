"use client";

import { FiskHeroCat } from "@/components/fisk-hero-cat";

/** A persistent, non-blocking Fisk sighting that keeps the interface feeling alive. */
export function FiskCornerCameo() {
  return (
    <aside className="fisk-corner-cameo" role="status" aria-label="Fisk found a signal">
      <span>Signal found.</span>
      <div aria-hidden="true"><FiskHeroCat state="peeking" /></div>
    </aside>
  );
}
