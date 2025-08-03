import { type ElementType, type ReactNode } from "react";
import { CgSpinner } from "react-icons/cg";

import { type PropsWithAs } from "@/types/react";
import { classVariants, cn } from "@/utils/styling";

interface ButtonVariantsProps {
  /**
   * @default "fill"
   */
  variant?: "fill" | "outline";
  /**
   * @default "md"
   */
  size?: "md" | "lg";
}

const getVariantClass = classVariants<ButtonVariantsProps>(
  cn(
    "inline-flex items-center justify-center rounded-md font-bold transition-colors duration-200 ease-out",
  ),
  {
    variant: {
      fill: cn(
        "bg-primary-600 text-white hover:bg-primary-800 active:bg-primary-700",
      ),
      outline: cn(
        "border border-current text-primary-600 bg-white hover:bg-primary-50",
      ),
    },
    size: {
      md: cn("h-10 px-5"),
      lg: cn("h-12 px-8"),
    },
  },
);

type ButtonProps<T extends ElementType> = PropsWithAs<T, "button"> &
  ButtonVariantsProps & {
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
        getVariantClass({ variant, size }),
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
