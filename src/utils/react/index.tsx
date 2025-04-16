import { forwardRef } from "react";

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
