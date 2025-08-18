"use client";

import { type ComponentPropsWithRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

import { cn } from "@/utils/styling";

const underlineClassNames = {
  true: "underline hover:decoration-2",
  false: "hover:underline hover:decoration-2",
} as const;

export interface ExternalTextLinkProps
  extends Omit<ComponentPropsWithRef<"a">, "target" | "rel"> {
  /**
   * @default false
   */
  withUnderline?: boolean;
  preventLink?: boolean;
}

export function ExternalTextLink(props: ExternalTextLinkProps) {
  const {
    withUnderline = false,
    preventLink,
    onClick,
    className,
    children,
    ...restProps
  } = props;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-xs underline-offset-4",
        underlineClassNames[`${withUnderline}`],
        "inline-flex items-center space-x-1",
        className,
      )}
      onClick={(event) => {
        if (preventLink) {
          event.preventDefault();
        }
        onClick?.(event);
      }}
      {...restProps}
    >
      <span>{children}</span>
      <BsArrowUpRight />
    </a>
  );
}
