import { useRef, useEffect } from "react";

function useMediaQuery(
  query: string,
  onChange?: (event: MediaQueryListEvent) => void,
) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      onChangeRef.current?.(event);
    };

    mql.addEventListener("change", listener);

    return () => mql.removeEventListener("change", listener);
  }, [query]);
}

export { useMediaQuery };
