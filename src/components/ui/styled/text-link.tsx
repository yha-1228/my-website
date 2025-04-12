"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { type LinkComponentProps } from "@/lib/next/types";
import { cn } from "@/utils/css/cn";
import {
  ExternalLink,
  type ExternalLinkProps,
} from "../unstyled/external-link";

function createBaseClassName(withUnderline?: boolean) {
  const common = cn("rounded-sm underline-offset-4");
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

const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>((props, ref) => {
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
      ref={ref}
    />
  );
});

TextLink.displayName = "TextLink";

// ----------------------------------------

interface ExternalTextLinkProps extends ExternalLinkProps {
  withUnderline?: boolean;
  preventLink?: boolean;
}

const ExternalTextLink = forwardRef<HTMLAnchorElement, ExternalTextLinkProps>(
  (props, ref) => {
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
        ref={ref}
      >
        <span>{children}</span>
        <FiExternalLink />
      </ExternalLink>
    );
  },
);

ExternalTextLink.displayName = "ExternalTextLink";

// ----------------------------------------

export { TextLink, ExternalTextLink };
