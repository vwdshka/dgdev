import { useSyncExternalStore } from "react";

// The skill picked in the Skills section, shared with the project cards further down the page.
// Module state is enough: both sections live on the same page and only this one value is shared.
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
