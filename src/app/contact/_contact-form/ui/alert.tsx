"use client";

import { CircleAlert, CircleCheckBig } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import { findFocusableElements } from "@/utils/dom";
import { cn } from "@/utils/styling";

type Variant = "success" | "error";

const variantClassNames = {
  success: "border border-brand-base **:data-[slot=heading]:text-brand-dark",
  error: "border border-danger-base **:data-[slot=heading]:text-danger-dark",
} as const satisfies Record<Variant, unknown>;

const variantIconMap = {
  success: <CircleCheckBig className="stroke-brand-base mt-1.5 size-5" />,
  error: <CircleAlert className="stroke-danger-base mt-1.5 size-5" />,
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
        <div className="text-lg font-bold" data-slot="heading">
          {heading}
        </div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

export { Alert };
