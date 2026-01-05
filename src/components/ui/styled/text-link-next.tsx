"use client";

import Link from "next/link";

import { TextLink, type TextLinkProps } from "./text-link";

export function TextLinkNext(props: Omit<TextLinkProps<typeof Link>, "as">) {
  return <TextLink as={Link} {...props} />;
}
