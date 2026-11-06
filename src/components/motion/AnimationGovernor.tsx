"use client";

import { useEffect } from "react";

// Pauses SVG (SMIL) animation timelines while they are off-screen and resumes them just before
// they scroll back into view. Browsers keep sampling SMIL timelines even when nothing is visible,
// which is steady main-thread work competing with on-screen motion during scrolling.
const MARGIN = "200px 0px";

export function AnimationGovernor() {
  useEffect(() => {
    const svgIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const svg = e.target as SVGSVGElement;
          if (e.isIntersecting) svg.unpauseAnimations();
          else svg.pauseAnimations();
        }),
      { rootMargin: MARGIN },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("svg").forEach((svg) => {
        if (!seen.has(svg) && svg.querySelector("animate, animateMotion, animateTransform")) {
          seen.add(svg);
          svgIO.observe(svg);
        }
      });
    };
    scan();
    // Client sections can add animated SVGs later (tab switches, layer picks)
    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = window.setTimeout(() => {
        queued = 0;
        scan();
      }, 250);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      svgIO.disconnect();
      mo.disconnect();
      window.clearTimeout(queued);
    };
  }, []);
  return null;
}
