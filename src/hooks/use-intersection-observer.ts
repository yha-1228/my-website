import { type RefObject, useEffect } from "react";

function useIntersectionObserver(
  ref: RefObject<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  // 404を起こさせる画面では、ここが-NaNpxになりエラーとなる
  // 暫定対応
  if (options?.rootMargin === "-NaNpx") {
    options.rootMargin = undefined;
  }

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const intersectionObserver = new IntersectionObserver(callback, options);

    intersectionObserver.observe(target);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [callback, options, ref]);
}

export { useIntersectionObserver };
