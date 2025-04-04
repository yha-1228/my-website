import { createContext, forwardRef, useContext } from "react";
import { type FixedForwardRef } from "@/types/react";

interface GenerateContextOptions {
  /**
   * @default "useContext"
   */
  hookName?: string;
  /**
   * @default "Context.Provider"
   */
  providerName?: string;
}

function generateContext<T>(options: GenerateContextOptions = {}) {
  const { hookName = "useContext", providerName = "Context.Provider" } =
    options;
  const Context = createContext<T | null>(null);

  function useContextValue() {
    const value = useContext(Context);
    if (!value)
      throw new Error(`${hookName} must be inside <${providerName} />`);
    return value as T;
  }

  return [Context, useContextValue] as const;
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

export { type GenerateContextOptions, generateContext, fixedForwardRef };
