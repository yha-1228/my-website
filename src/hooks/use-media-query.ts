import { useEffect, useRef, useState } from "react";

type UseMediaQueryState =
  | { state: "pending" }
  | { state: "loaded"; matches: boolean };

const initialState = { state: "pending" } as const satisfies UseMediaQueryState;

function useMediaQuery(
  query: string,
  onChange?: (event: MediaQueryListEvent) => void,
) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const [state, setState] = useState<UseMediaQueryState>(initialState);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setState({ state: "loaded", matches: event.matches });
      onChangeRef.current?.(event);
    };

    mql.addEventListener("change", listener);

    return () => {
      mql.removeEventListener("change", listener);
      setState(initialState);
    };
  }, [query]);

  return state;
}

export { useMediaQuery, type UseMediaQueryState };
