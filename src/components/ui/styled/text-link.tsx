"use client";

import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

import { type LinkComponentProps } from "@/lib/next/types";
import { cn } from "@/utils/css/cn";

import {
  ExternalLink,
  type ExternalLinkProps,
} from "../unstyled/external-link";

function createBaseClassName(withUnderline?: boolean) {
  const common = cn("rounded-xs underline-offset-4");
  const withUnderlineClass = withUnderline
    ? cn("underline hover:decoration-2")
    : cn("hover:underline hover:decoration-2");

  return cn(common, withUnderlineClass);
}

// ----------------------------------------

interface TextLinkProps extends LinkComponentProps {
  withUnderline?: boolean;
  preventLink?: boolean;
}

function TextLink(props: TextLinkProps) {
  const { withUnderline, preventLink, onClick, className, ...restProps } =
    props;

  return (
    <Link
      className={cn(createBaseClassName(withUnderline), className)}
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

interface ExternalTextLinkProps extends ExternalLinkProps {
  withUnderline?: boolean;
  preventLink?: boolean;
}

function ExternalTextLink(props: ExternalTextLinkProps) {
  const {
    withUnderline,
    preventLink,
    onClick,
    className,
    children,
    ...restProps
  } = props;

  return (
    <ExternalLink
      className={cn(
        createBaseClassName(withUnderline),
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
