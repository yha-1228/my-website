import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";
import Link from "next/link";
import { type LinkComponentProps } from "@/lib/next/types";
import { cn } from "@/utils/css/cn";

// common
// ----------------------------------------

type ButtonVariant = "fill" | "outline";

interface ButtonBaseProps {
  disabled?: boolean;
  rightIcon?: ReactNode;
  /**
   * @default "fill"
   */
  variant?: ButtonVariant;
}

function createBaseClassName(variant: ButtonVariant) {
  const common = cn(
    "inline-flex items-center justify-center rounded-md px-5 py-2 font-bold",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300",
  );

  const variantClassMap = {
    fill: cn(
      "bg-primary-600 text-white",
      "hover:bg-primary-800",
      "active:bg-primary-700",
    ),
    outline: cn(
      "border border-[currentColor] text-primary-600 bg-white",
      "hover:bg-primary-50",
      "active:bg-primary-50/50",
    ),
  } as const satisfies Record<ButtonVariant, string>;

  return cn(common, variantClassMap[variant]);
}

// ----------------------------------------

interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    ButtonBaseProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
        createBaseClassName(variant),
        "disabled:cursor-not-allowed disabled:bg-base-light-400",
        className,
      )}
      {...restProps}
      ref={ref}
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
});

Button.displayName = "Button";

// ----------------------------------------

interface ButtonLinkProps
  extends Omit<LinkComponentProps, "aria-disabled" | "role" | "tabIndex">,
    ButtonBaseProps {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
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
          createBaseClassName(variant),
          "aria-disabled:pointer-events-none aria-disabled:bg-base-light-400",
          className,
        )}
        {...ariaProps}
        {...restProps}
        ref={ref}
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
  },
);

ButtonLink.displayName = "ButtonLink";

// ----------------------------------------

export { Button, type ButtonProps, ButtonLink, type ButtonLinkProps };
