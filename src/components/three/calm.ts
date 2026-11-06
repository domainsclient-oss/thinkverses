// Shared "is the visitor scrolling right now?" signal for the WebGL scenes.
// Heavy one-off work (creating a scene, its first frame with the environment map) is deferred
// to calm moments so it never freezes on-screen animations mid-scroll.

let lastScroll = 0;
let hooked = false;

/** A real pause, not the gap between two wheel notches */
export const CALM_MS = 500;

export function hookScroll() {
  if (hooked || typeof window === "undefined") return;
  hooked = true;
  const mark = () => (lastScroll = performance.now());
  window.addEventListener("scroll", mark, { passive: true });
  window.addEventListener("wheel", mark, { passive: true });
  window.addEventListener("touchmove", mark, { passive: true });
}

export function quietFor() {
  return performance.now() - lastScroll;
}

/** Resolves once scrolling has been quiet for CALM_MS and the browser has idle time. */
export function waitForCalm(): Promise<void> {
  hookScroll();
  return new Promise((resolve) => {
    const attempt = () => {
      const q = quietFor();
      if (q < CALM_MS) return void window.setTimeout(attempt, CALM_MS - q + 20);
      const go = () => (quietFor() < CALM_MS ? attempt() : resolve());
      if ("requestIdleCallback" in window) window.requestIdleCallback(go, { timeout: 1200 });
      else setTimeout(go, 60);
    };
    attempt();
  });
}
