"use client";

import { useEffect, useState } from "react";
import { FiskHeroCat } from "@/components/fisk-hero-cat";

/** A single short Fisk sighting that keeps the interface feeling alive. */
export function FiskCornerCameo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 2600);
    const hide = window.setTimeout(() => setVisible(false), 7800);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside className="fisk-corner-cameo" role="status" aria-label="Fisk found a signal">
      <span>Signal found.</span>
      <div aria-hidden="true"><FiskHeroCat state="peeking" /></div>
    </aside>
  );
}
