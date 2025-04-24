"use client";

import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { BsCheck2Circle, BsExclamationCircle } from "react-icons/bs";

import { classVariants, cn } from "@/utils/styling";

interface AlertVariantsProps {
  variant: "success" | "error";
}

const getVariantClass = classVariants<AlertVariantsProps>(
  cn("px-5 pt-4 pb-5 block sm:flex"),
  {
    variant: {
      success: cn("bg-primary-50 text-primary-900 rounded-lg"),
      error: cn("bg-danger-50 text-danger-900 rounded-lg"),
    },
  },
);

const variantIconMap = {
  success: <BsCheck2Circle className="fill-primary-600 mt-1 size-5" />,
  error: <BsExclamationCircle className="fill-danger-600 mt-1 size-5" />,
} as const satisfies Record<AlertVariantsProps["variant"], ReactNode>;

interface AlertProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role" | "tabIndex">,
    AlertVariantsProps {
  alertTitle: ReactNode;
  closeAction?: { onClick?: (event: MouseEvent<HTMLButtonElement>) => void };
}

function Alert(props: AlertProps) {
  const { variant, alertTitle, className, children, ...restProps } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      role="alert"
      tabIndex={-1}
      className={cn(getVariantClass({ variant }), className)}
      ref={ref}
      {...restProps}
    >
      <div className="hidden sm:block">{variantIconMap[variant]}</div>
      <div className="sm:ml-3">
        <div className="text-lg font-bold">{alertTitle}</div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

export { Alert };
