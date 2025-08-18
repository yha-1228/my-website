"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { BsCheck2Circle, BsExclamationCircle } from "react-icons/bs";

import { findFocusableElements } from "@/utils/dom";
import { cn } from "@/utils/styling";

type Variant = "success" | "error";

const variantClassNames = {
  success: "bg-primary-50 text-primary-900",
  error: "bg-danger-50 text-danger-900",
} as const satisfies Record<Variant, string>;

const variantIconMap = {
  success: <BsCheck2Circle className="fill-primary-600 mt-1 size-5" />,
  error: <BsExclamationCircle className="fill-danger-600 mt-1 size-5" />,
} as const satisfies Record<Variant, ReactNode>;

interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  variant: Variant;
  heading: ReactNode;
}

function Alert(props: AlertProps) {
  const { variant, heading, className, children, ...restProps } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const focusableElements = findFocusableElements(ref.current);
    focusableElements.at(0)?.focus();
  }, []);

  return (
    <div
      role="alert"
      className={cn(
        "block rounded-lg px-5 pt-4 pb-5 sm:flex",
        variantClassNames[variant],
        className,
      )}
      ref={ref}
      {...restProps}
    >
      <div className="hidden sm:block">{variantIconMap[variant]}</div>
      <div className="sm:ml-3">
        <div className="text-lg font-bold">{heading}</div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

export { Alert };
