import { type Dispatch, type SetStateAction, useState } from "react";

function useStateWithReset<S>(
  initialState: S,
): [S, Dispatch<SetStateAction<S>>, () => void] {
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);
  return [state, setState, resetState] as const;
}

export { useStateWithReset };
