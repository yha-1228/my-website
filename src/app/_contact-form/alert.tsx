import { type ComponentProps } from "react";
import { cn } from "@/utils/css/cn";

export function Alert({
  className,
  ...props
}: Omit<ComponentProps<"div">, "role">) {
  return (
    <div
      role="alert"
      className={cn("rounded-lg px-5 sm:px-7 py-5 bg-danger-50", className)}
      {...props}
    />
  );
}
