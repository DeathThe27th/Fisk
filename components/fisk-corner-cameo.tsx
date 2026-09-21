"use client";

import { FiskHeroCat } from "@/components/fisk-hero-cat";

/** A persistent, non-blocking Fisk sighting that keeps the interface feeling alive. */
export function FiskCornerCameo({ onActivate, label = "Signal found.", ariaLabel = "Fisk found a signal", className = "" }: { onActivate?: () => void; label?: string; ariaLabel?: string; className?: string }) {
  const interactive = Boolean(onActivate);
  return (
    <aside className={`fisk-corner-cameo${interactive ? " is-interactive" : ""}${className ? ` ${className}` : ""}`} role={interactive ? undefined : "status"} aria-label={ariaLabel}>
      <span>{label}</span>
      <div aria-hidden="true"><FiskHeroCat state="peeking" /></div>
      {onActivate && <button type="button" onClick={onActivate} aria-label={ariaLabel} />}
    </aside>
  );
}
