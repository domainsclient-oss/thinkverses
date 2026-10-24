"use client";

import { useEffect, useRef } from "react";

// Looping, muted background video. Pauses off-screen to save battery,
// and stays on the poster frame for visitors who prefer reduced motion.
// `name` maps to /videos/<name>.webm, .mp4 and -poster.jpg.
export function BackgroundVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;

    const sync = () => {
      if (mq.matches || !visible) video.pause();
      else video.play().catch(() => {});
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(video);
    mq.addEventListener("change", sync);
    sync();
    return () => {
      io.disconnect();
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={`/videos/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
