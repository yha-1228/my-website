"use client";

import { ExternalLink } from "lucide-react";
import { type ElementType } from "react";

import { TextLink, type TextLinkProps } from "@/components/ui/styled/text-link";
import { cn } from "@/utils/styling";

export type ExternalTextLinkProps<TAs extends ElementType> = Omit<
  TextLinkProps<TAs>,
  "target" | "rel"
>;

export function ExternalTextLink<TAs extends ElementType>(
  props: ExternalTextLinkProps<TAs>,
) {
  const { className, children, ...restProps } = props;

  return (
    <TextLink
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
      {...restProps}
    >
      <span>{children}</span>
      <ExternalLink size={18} />
    </TextLink>
  );
}
