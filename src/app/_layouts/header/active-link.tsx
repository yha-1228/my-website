"use client";

import { usePathname } from "next/navigation";
import { type ElementType } from "react";

import { type PropsWithAs } from "@/types/react";

type ActiveLinkProps<TAs extends ElementType> = Omit<
  PropsWithAs<TAs, "a">,
  "aria-current" | "data-active"
>;

function ActiveLink<TAs extends ElementType>(props: ActiveLinkProps<TAs>) {
  const { as: Comp = "a", href, ...restProps } = props;
  const pathname = usePathname();
  const firstPathActive = href === `/${pathname.split("/")[1]}`;

  return (
    <Comp
      href={href}
      aria-current={firstPathActive ? "page" : undefined}
      data-active={firstPathActive ? "true" : undefined}
      {...restProps}
    />
  );
}

export { ActiveLink };
export type { ActiveLinkProps };
