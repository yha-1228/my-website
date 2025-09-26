import { type ElementType, type ReactNode } from "react";
import { CgSpinner } from "react-icons/cg";

import { type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

type Variant = "fill" | "outline";

type Size = "md" | "lg";

const variantClassNames = {
  fill: "bg-foreground-primary text-white hover:not-disabled:opacity-80 active:not-disabled:opacity-70",
  outline:
    "border border-current text-foreground-primary bg-white hover:not-disabled:opacity-80 active:not-disabled:opacity-70",
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
  /**
   * NOTE: `twMerge`の不具合？により、外部から`rounded-*`を付与しても上書きされない
   *
   * @default false
   */
  fullRounded?: boolean;
};

function Button<T extends ElementType>(props: ButtonProps<T>) {
  const {
    as: Comp = "button",
    variant = "fill",
    size = "md",
    loading = false,
    loadingLabel = undefined,
    disabled = false,
    fullRounded = false,
    className,
    children,
    ...restProps
  } = props;

  return (
    <Comp
      className={cn(
        "inline-flex cursor-pointer items-center justify-center transition-opacity duration-200 ease-out",
        variantClassNames[variant],
        sizeClassNames[size],
        "disabled:cursor-not-allowed disabled:opacity-40",
        fullRounded ? "rounded-full" : "rounded-touchable",
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
