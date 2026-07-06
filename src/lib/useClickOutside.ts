import { useEffect, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutside: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutside();
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onOutside();
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", onEsc);
    };
  }, [ref, onOutside, enabled]);
}
