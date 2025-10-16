import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

export function SkillTag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "rounded-sm border border-[black]/30 bg-white px-1.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
