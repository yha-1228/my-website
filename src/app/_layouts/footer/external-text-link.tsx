"use client";

import { type ComponentPropsWithRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

import { type TextLinkVariantsProps } from "@/components/ui/styled/text-link";
import { classVariants, cn } from "@/utils/styling";

const getVariantClass = classVariants<TextLinkVariantsProps>(
  cn("rounded-xs underline-offset-4"),
  {
    withUnderline: {
      true: cn("underline hover:decoration-2"),
      false: cn("hover:underline hover:decoration-2"),
    },
  },
);

export interface ExternalTextLinkProps
  extends Omit<ComponentPropsWithRef<"a">, "target" | "rel">,
    TextLinkVariantsProps {
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
        getVariantClass({ withUnderline }),
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
