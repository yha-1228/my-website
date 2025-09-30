"use client";

import { type ReactNode, useState } from "react";

import { getContextAndHook } from "@/utils/react";

function useTransitionUpdate(initialState = false) {
  const [isPending, setIsPending] = useState(initialState ?? false);

  return { isPending, setIsPending };
}

type UseTransitionUpdateReturn = ReturnType<typeof useTransitionUpdate>;

const [useTransitionUpdateContext, TransitionUpdateContext] =
  getContextAndHook<UseTransitionUpdateReturn>(
    "TransitionUpdateContext",
    "TransitionUpdateProvider",
  );

interface TransitionUpdateProviderProps {
  children?: ReactNode;
  /**
   * @default false
   */
  initialState?: boolean;
}

export function TransitionUpdateProvider({
  children,
  initialState,
}: TransitionUpdateProviderProps) {
  const contextValue = useTransitionUpdate(initialState);

  return (
    <TransitionUpdateContext.Provider value={contextValue}>
      {children}
    </TransitionUpdateContext.Provider>
  );
}

export { useTransitionUpdateContext };
