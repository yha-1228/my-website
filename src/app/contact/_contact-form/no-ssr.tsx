"use client";

import { type PropsWithChildren, type ReactNode } from "react";

import { useIsClient } from "@/hooks/use-is-client";

type NoSSRProps = PropsWithChildren<{
  /**
   * @default null
   */
  fallback?: ReactNode;
}>;

function NoSSR(props: NoSSRProps) {
  const { children, fallback = null } = props;
  const isClient = useIsClient();

  return isClient ? children : fallback;
}

export { NoSSR };
export type { NoSSRProps };
