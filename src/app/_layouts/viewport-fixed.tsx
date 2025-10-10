"use client";

import { useEffect } from "react";

function useViewportFixed(minWidth: number) {
  useEffect(() => {
    const resizeHandler = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) return;

      const nextValue =
        window.outerWidth > minWidth
          ? ("width=device-width,initial-scale=1" as const)
          : (`width=${minWidth}` as const);

      if (viewport.getAttribute("content") !== nextValue) {
        viewport.setAttribute("content", nextValue);
      }
    };

    resizeHandler();

    addEventListener("resize", resizeHandler);

    return () => removeEventListener("resize", resizeHandler);
  }, [minWidth]);
}

export function ViewportFixed({ minWidth }: { minWidth: number }) {
  useViewportFixed(minWidth);

  return null;
}
