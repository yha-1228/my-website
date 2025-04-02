import { useEffect, useRef } from "react";

function useIntersectionObserver<T extends HTMLElement>(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const intersectionObserver = new IntersectionObserver(callback, options);

    intersectionObserver.observe(target);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [callback, options, ref]);

  return ref;
}

export { useIntersectionObserver };
