import { createContext, forwardRef, type ReactNode, useContext } from "react";
import { type FixedForwardRef } from "@/types/react";

type RequiredChildren<T> = T & { children: ReactNode };

function createContextState<P, T>(useValue: (props: P) => T) {
  const createdContext = createContext<T | null>(null);

  function useValueContext(): T {
    const value = useContext(createdContext);
    if (!value)
      throw new Error(`useContext must be inside <Context.Provider />`);
    return value as T;
  }

  function ValueProvider(props: RequiredChildren<P>) {
    const { children, ...restProps } = props;
    const value = useValue(restProps as P);

    return (
      <createdContext.Provider value={value}>
        {children}
      </createdContext.Provider>
    );
  }

  return [useValueContext, ValueProvider] as const;
}

/**
 * @example
 *
 * ```tsx
 * type PolymorphicBlackButtonProps<TAs extends ElementType> = ComponentPropsWithAs<
 *   TAs,
 *   "button"
 * >;
 *
 * const PolymorphicBlackButton = fixedForwardRef(
 *  <TAs extends ElementType>(
 *    props: PolymorphicBlackButtonProps<TAs>,
 *    ref: ForwardedElementRef<TAs>,
 *  ) => {
 *    const { as: Comp = "button", style, ...restProps } = props;
 *
 *    return (
 *      <Comp
 *        style={{ backgroundColor: "black", color: "white", ...style }}
 *        {...restProps}
 *        ref={ref}
 *      />
 *    );
 *  },
 *);
 *
 * // Usage
 * function Root() {
 *   const ref = useRef<HTMLAnchorElement>(null);
 *
 *   return (
 *     <PolymorphicBlackButton as="a" href="/" ref={ref}>
 *       Link
 *     </PolymorphicBlackButton>
 *   );
 * }
 * ```
 */
const fixedForwardRef = forwardRef as FixedForwardRef;

export { createContextState, fixedForwardRef };
