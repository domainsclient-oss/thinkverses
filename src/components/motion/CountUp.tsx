"use client";

import { useEffect, useRef } from "react";

// Counts the numeric part of an existing figure up from zero when it scrolls into view.
// Server render and the final frame are always the exact original string.
export function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      return num.includes(",") ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
    };
    // Same feel as the site's ease-out-soft curve
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    let raf = 0;
    el.textContent = `${pre}${fmt(0)}${post}`;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          el.textContent = t < 1 ? `${pre}${fmt(target * ease(t))}${post}` : value;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
