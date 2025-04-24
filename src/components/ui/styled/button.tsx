import Link from "next/link";
import { type ComponentPropsWithRef, type ReactNode } from "react";

import { type LinkComponentProps } from "@/lib/next/types";
import { classVariants, cn } from "@/utils/styling";

// common
// ----------------------------------------

interface ButtonVariantsProps {
  /**
   * @default "fill"
   */
  variant?: "fill" | "outline";
}

const getVariantClass = classVariants<ButtonVariantsProps>(
  cn(
    "inline-flex items-center justify-center rounded-md px-5 py-2 font-bold transition-colors duration-200 ease-out",
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
    className,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={cn(
        getVariantClass({ variant }),
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
  extends Omit<LinkComponentProps, "aria-disabled" | "role" | "tabIndex">,
    ButtonBaseProps {}

function ButtonLink(props: ButtonLinkProps) {
  const {
    rightIcon,
    variant = "fill",
    disabled,
    className,
    children,
    ...restProps
  } = props;

  const ariaProps = {
    "aria-disabled": disabled,
    role: "button",
    ...(disabled ? { tabIndex: -1 } : {}),
  } as const satisfies Partial<LinkComponentProps>;

  return (
    <Link
      className={cn(
        getVariantClass({ variant }),
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
