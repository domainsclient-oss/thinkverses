"use client";

import { useSyncExternalStore } from "react";

// Shares the two-minute check result with the booking form on the same page.
export type CheckResult = { level: number; name: string } | null;

let current: CheckResult = null;
const listeners = new Set<() => void>();

export function setCheckResult(next: CheckResult) {
  if (current?.level === next?.level && current?.name === next?.name) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useCheckResult() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
