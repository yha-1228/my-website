import { createContext, useContext } from "react";

export function getContextAndHook<T extends NonNullable<unknown>>(
  hookName: string,
  providerName: string,
) {
  const Context = createContext<T | null>(null);

  function useValueContext() {
    const value = useContext(Context);
    if (value == null) {
      throw new Error(`${hookName} must be inside <${providerName} />`);
    }
    return value;
  }

  return [useValueContext, Context] as const;
}
