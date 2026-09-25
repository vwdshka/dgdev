import { useSyncExternalStore } from "react";

// the skill picked in Skills, read by the project cards further down
export type Picked = { name: string; used: string[] } | null;

let picked: Picked = null;
const listeners = new Set<() => void>();

export function pickSkill(next: Picked) {
  picked = next;
  listeners.forEach((l) => l());
}

export function usePickedSkill(): Picked {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => picked,
    () => null,
  );
}
