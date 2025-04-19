import { createContext, useContext } from "react";

function getContextAndProvider<T extends NonNullable<unknown>>() {
  const Context = createContext<T | null>(null);

  function useValueContext() {
    const value = useContext(Context);
    if (!value)
      throw new Error(`useContext must be inside <Context.Provider />`);
    return value;
  }

  return [useValueContext, Context.Provider] as const;
}

export { getContextAndProvider };
