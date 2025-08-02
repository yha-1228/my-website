"use client";

import { BsArrowUpRight } from "react-icons/bs";

import { type TextLinkVariantsProps } from "@/components/ui/styled/text-link";
import {
  ExternalLink,
  type ExternalLinkProps,
} from "@/components/ui/unstyled/external-link";
import { classVariants, cn } from "@/utils/styling";

export interface ExternalTextLinkProps
  extends ExternalLinkProps,
    TextLinkVariantsProps {
  preventLink?: boolean;
}

const getVariantClass = classVariants<TextLinkVariantsProps>(
  cn("rounded-xs underline-offset-4"),
  {
    withUnderline: {
      true: cn("underline hover:decoration-2"),
      false: cn("hover:underline hover:decoration-2"),
    },
  },
);

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
    <ExternalLink
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
    </ExternalLink>
  );
}
