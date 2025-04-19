import { type ComponentProps } from "react";

import { cn } from "@/utils/css/cn";

export function Alert({
  className,
  ...props
}: Omit<ComponentProps<"div">, "role">) {
  return (
    <div
      role="alert"
      className={cn("rounded-lg bg-danger-50 px-5 py-5 sm:px-7", className)}
      {...props}
    />
  );
}
