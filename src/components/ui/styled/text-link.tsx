"use client";

import Link from "next/link";
import { type ComponentPropsWithRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

import { classVariants, cn } from "@/utils/styling";

import {
  ExternalLink,
  type ExternalLinkProps,
} from "../unstyled/external-link";

interface TextLinkVariantsProps {
  /**
   * @default false
   */
  withUnderline?: boolean;
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

// ----------------------------------------

interface TextLinkProps
  extends ComponentPropsWithRef<typeof Link>,
    TextLinkVariantsProps {
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
      className={cn(getVariantClass({ withUnderline }), className)}
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

interface ExternalTextLinkProps
  extends ExternalLinkProps,
    TextLinkVariantsProps {
  preventLink?: boolean;
}

function ExternalTextLink(props: ExternalTextLinkProps) {
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

// ----------------------------------------
export { TextLink, ExternalTextLink };
export type { TextLinkProps, ExternalTextLinkProps };
