"use client";

import { type ElementType, type MouseEvent } from "react";

import { type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

const underlineClassNames = {
  true: "underline-offset-[6px] decoration-1 underline hover:decoration-2 decoration-brand-base",
  false:
    "hover:underline underline-offset-[6px] hover:decoration-1 decoration-brand-base",
} as const;

type TextLinkProps<TAs extends ElementType> = PropsWithAs<TAs, "a"> & {
  /**
   * @default false
   */
  withUnderline?: boolean;
  preventLink?: boolean;
};

function TextLink<TAs extends ElementType>(props: TextLinkProps<TAs>) {
  const {
    as: Comp = "a",
    withUnderline = false,
    preventLink,
    onClick,
    className,
    ...restProps
  } = props;

  return (
    <Comp
      className={cn(underlineClassNames[`${withUnderline}`], className)}
      onClick={(event: MouseEvent) => {
        if (preventLink) {
          event.preventDefault();
        }
        onClick?.(event);
      }}
      {...restProps}
    />
  );
}

export { TextLink };
export type { TextLinkProps };
