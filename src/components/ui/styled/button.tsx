import Link from "next/link";
import { type ComponentPropsWithRef, type ReactNode } from "react";
import { CgSpinner } from "react-icons/cg";

import { type CommonHTMLProps } from "@/types/react";
import { classVariants, cn } from "@/utils/styling";

// common
// ----------------------------------------

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
        "border border-[currentColor] text-primary-600 bg-white hover:bg-primary-50",
      ),
    },
    size: {
      md: cn("h-10 px-5"),
      lg: cn("h-12 px-8"),
    },
  },
);

interface ButtonBaseProps extends ButtonVariantsProps {
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
}

// ----------------------------------------

interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    ButtonBaseProps {}

function Button(props: ButtonProps) {
  const {
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
    <button
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
    </button>
  );
}

// ----------------------------------------

function getDisabledLinkAriaProps(disabled: boolean) {
  return {
    "aria-disabled": disabled ? "true" : undefined,
    tabIndex: disabled ? -1 : undefined,
  } as const satisfies CommonHTMLProps;
}

interface ButtonLinkProps
  extends Omit<
      ComponentPropsWithRef<typeof Link>,
      "aria-disabled" | "role" | "tabIndex"
    >,
    ButtonBaseProps {}

function ButtonLink(props: ButtonLinkProps) {
  const {
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
    <Link
      role="button"
      className={cn(
        getVariantClass({ variant, size }),
        "aria-disabled:bg-base-light-400 aria-disabled:pointer-events-none",
        className,
      )}
      {...getDisabledLinkAriaProps(disabled || loading)}
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
    </Link>
  );
}

// ----------------------------------------

export { Button, type ButtonProps, ButtonLink, type ButtonLinkProps };
