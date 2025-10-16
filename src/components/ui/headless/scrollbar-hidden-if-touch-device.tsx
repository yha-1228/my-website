"use client";

import { type ComponentProps } from "react";

import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { cn } from "@/utils/styling";

export function ScrollbarHiddenIfTouchDevice({
  className,
  ...props
}: ComponentProps<"div">) {
  const isTouchDevice = useIsTouchDevice();

  return (
    <div
      className={cn(isTouchDevice && "scrollbar-hidden", className)}
      {...props}
    />
  );
}
