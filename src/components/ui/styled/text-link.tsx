"use client";

import Link from "next/link";
import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

const underlineClassNames = {
  true: "underline hover:decoration-2",
  false: "hover:underline hover:decoration-2",
} as const;

// ----------------------------------------

interface TextLinkProps extends ComponentPropsWithRef<typeof Link> {
  /**
   * @default false
   */
  withUnderline?: boolean;
  preventLink?: boolean;
}

function TextLink(props: TextLinkProps) {
  const {
    withUnderline = false,
    preventLink,
    onClick,
    className,
    ...restProps
  } = props;

  return (
    <Link
      className={cn(
        "rounded-xs underline-offset-4",
        underlineClassNames[`${withUnderline}`],
        className,
      )}
      onClick={(event) => {
        if (preventLink) {
          event.preventDefault();
        }
        onClick?.(event);
      }}
      {...restProps}
    />
  );
}

// ----------------------------------------
export { TextLink };
export type { TextLinkProps };
