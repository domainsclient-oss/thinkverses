"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

// Card that tilts toward the pointer in 3D and carries a moving glare; inner layers
// marked .hiw-panel / .hiw-copy lift off the card at different depths (see globals.css).
export function TiltCard({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`hiw-card ${className}`}>
      <span className="hiw-glare pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden="true" />
      {children}
    </div>
  );
}
