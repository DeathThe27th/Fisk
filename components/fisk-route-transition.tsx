"use client";

import { useEffect, useState } from "react";
import { FiskCatMark } from "@/components/fisk-cat";

const ROUTE_DELAY = 5000;

/** Adds a short, intentional handoff between the landing page and research desk. */
export function FiskRouteTransition() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      const localHandoff = ["/", "/desk"].includes(window.location.pathname) && ["/", "/desk"].includes(destination.pathname);
      const isHashNavigation = destination.pathname === window.location.pathname && destination.search === window.location.search && Boolean(destination.hash);
      if (!localHandoff || isHashNavigation || destination.origin !== window.location.origin || destination.href === window.location.href) return;

      event.preventDefault();
      setActive(true);
      window.setTimeout(() => window.location.assign(destination.href), ROUTE_DELAY);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!active) return null;

  return (
    <div className="fisk-route-transition" role="status" aria-live="polite">
      <div className="fisk-transition-orbit"><span /><span /><span /><FiskCatMark size={48} /></div>
      <p>Following the thread.</p>
      <span>Fisk is opening a clearer view.</span>
      <div className="fisk-transition-progress"><i /></div>
    </div>
  );
}
