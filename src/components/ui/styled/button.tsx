import { type ElementType, type ReactNode } from "react";
import { CgSpinner } from "react-icons/cg";

import { type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

type Variant = "fill" | "outline";

type Size = "md" | "lg";

const variantClassNames = {
  fill: "bg-primary-600 text-white hover:bg-primary-800 active:bg-primary-700",
  outline:
    "border border-current text-primary-600 bg-white hover:bg-primary-50",
} as const satisfies Record<Variant, string>;

const sizeClassNames = {
  md: "h-10 px-5",
  lg: "h-12 px-8",
} as const satisfies Record<Size, string>;

type ButtonProps<T extends ElementType> = PropsWithAs<T, "button"> & {
  /**
   * @default "fill"
   */
  variant?: Variant;
  /**
   * @default "md"
   */
  size?: Size;
  /**
   * @default false
   */
  loading?: boolean;
  /**
   * `loading: true`のとき有効
   *
   * @default undefined
   */
  loadingLabel?: ReactNode;
  /**
   * @default false
   */
  disabled?: boolean;
};

function Button<T extends ElementType>(props: ButtonProps<T>) {
  const {
    as: Comp = "button",
    variant = "fill",
    size = "md",
    loading = false,
    loadingLabel = undefined,
    disabled = false,
    className,
    children,
    ...restProps
  } = props;

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md font-bold transition-colors duration-200 ease-out",
        variantClassNames[variant],
        sizeClassNames[size],
        "disabled:bg-base-light-400 disabled:cursor-not-allowed",
        className,
      )}
      disabled={disabled || loading}
      {...restProps}
    >
      {loading ? (
        <>
          <CgSpinner className="mr-3 size-5 animate-spin" aria-hidden="true" />
          {loadingLabel || children}
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, type ButtonProps };
