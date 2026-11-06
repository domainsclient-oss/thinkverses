"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

// Counts the numeric part of an existing figure up from zero when it scrolls into view.
// Server render and the final frame are always the exact original string.
export function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const m = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      return num.includes(",") ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
    };
    if (!inView) {
      el.textContent = `${pre}${fmt(0)}${post}`;
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${pre}${fmt(v)}${post}`),
      onComplete: () => (el.textContent = value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration]);

  return <span ref={ref}>{value}</span>;
}
