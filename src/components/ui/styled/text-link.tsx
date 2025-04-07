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

const baseClassName = cn("rounded-sm underline-offset-4 hover:underline");

// ----------------------------------------

interface TextLinkProps extends LinkComponentProps {
  preventLink?: boolean;
}

const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>((props, ref) => {
  const { preventLink, onClick, className, ...restProps } = props;

  return (
    <Link
      className={cn(baseClassName, className)}
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
  preventLink?: boolean;
}

const ExternalTextLink = forwardRef<HTMLAnchorElement, ExternalTextLinkProps>(
  (props, ref) => {
    const { preventLink, onClick, className, children, ...restProps } = props;

    return (
      <ExternalLink
        className={cn(
          baseClassName,
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
