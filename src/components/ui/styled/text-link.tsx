"use client";

import { type ElementType, type MouseEvent } from "react";

import { type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

const underlineClassNames = {
  true: "underline hover:decoration-2",
  false: "hover:underline hover:decoration-2",
} as const;

type TextLinkProps<TAs extends ElementType> = Omit<
  PropsWithAs<TAs, "a">,
  "withUnderline" | "preventLink"
> & {
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
      className={cn(
        "rounded-xs underline-offset-4",
        underlineClassNames[`${withUnderline}`],
        className,
      )}
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
