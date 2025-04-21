import { type ComponentProps } from "react";

import { cn } from "@/utils/css/cn";

export function Alert({
  className,
  ...props
}: Omit<ComponentProps<"div">, "role">) {
  return (
    <div
      role="alert"
      className={cn(
        "bg-danger-50 text-danger-600 border-l-danger-600 border-l-6 px-5 pt-4 pb-5",
        className,
      )}
      {...props}
    />
  );
}
