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
        "rounded-lg border border-danger-600 px-5 py-4 text-danger-600 bg-danger-50",
        className,
      )}
      {...props}
    />
  );
}
