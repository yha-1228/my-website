import Link from "next/link";
import { type ComponentPropsWithRef, type ReactNode } from "react";

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
  disabled?: boolean;
  rightIcon?: ReactNode;
}

// ----------------------------------------

interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    ButtonBaseProps {}

function Button(props: ButtonProps) {
  const {
    rightIcon,
    variant = "fill",
    size = "md",
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
      {...restProps}
    >
      {rightIcon ? (
        <>
          <span>{children}</span>
          <span className="ml-2 inline-flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// ----------------------------------------

interface ButtonLinkProps
  extends Omit<
      ComponentPropsWithRef<typeof Link>,
      "aria-disabled" | "role" | "tabIndex"
    >,
    ButtonBaseProps {}

function ButtonLink(props: ButtonLinkProps) {
  const {
    rightIcon,
    variant = "fill",
    size = "md",
    disabled,
    className,
    children,
    ...restProps
  } = props;

  const ariaProps = {
    role: "button",
    "aria-disabled": disabled ? "true" : undefined,
    tabIndex: disabled ? -1 : undefined,
  } as const satisfies CommonHTMLProps;

  return (
    <Link
      className={cn(
        getVariantClass({ variant, size }),
        "aria-disabled:bg-base-light-400 aria-disabled:pointer-events-none",
        className,
      )}
      {...ariaProps}
      {...restProps}
    >
      {rightIcon ? (
        <>
          <span>{children}</span>
          <span className="ml-2 inline-flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}

// ----------------------------------------

export { Button, type ButtonProps, ButtonLink, type ButtonLinkProps };
