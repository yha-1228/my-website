"use client";

import { type ComponentProps, useEffect, useRef } from "react";

import { cn } from "@/utils/styling";

export function Alert({
  className,
  ...props
}: Omit<ComponentProps<"div">, "role">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      tabIndex={-1}
      ref={ref}
      role="alert"
      className={cn(
        "bg-danger-50 text-danger-600 border-l-danger-600 border-l-6 px-5 pt-4 pb-5",
        className,
      )}
      {...props}
    />
  );
}
