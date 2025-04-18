import { createContext, forwardRef, useContext } from "react";

import { type FixedForwardRef } from "@/types/react";

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

export { fixedForwardRef };

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
