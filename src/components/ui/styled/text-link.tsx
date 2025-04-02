import React, { forwardRef } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { type LinkComponentProps } from "@/lib/next/types";
import { cn } from "@/utils/css/cn";
import {
  ExternalLink,
  type ExternalLinkProps,
} from "../unstyled/external-link";

const baseClassName = cn(
  "rounded-sm underline-offset-4 hover:underline",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300",
);

// ----------------------------------------

const TextLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <Link className={cn(baseClassName, className)} {...restProps} ref={ref} />
    );
  },
);

TextLink.displayName = "TextLink";

// ----------------------------------------

const ExternalTextLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <ExternalLink
        className={cn(
          baseClassName,
          "inline-flex items-center space-x-1",
          className,
        )}
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
