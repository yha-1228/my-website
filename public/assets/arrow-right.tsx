import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/css/cn";

export function ArrowRight({
  className,
  ...props
}: Omit<ComponentPropsWithRef<"svg">, "children">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="white"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
