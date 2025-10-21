import { useEffect } from "react";

export function useScrollLock({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (enabled) {
        document.body.style.removeProperty("overflow");
      }
    };
  }, [enabled]);
}
