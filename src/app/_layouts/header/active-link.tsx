"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentPropsWithRef } from "react";

type ActiveLinkProps = Omit<
  ComponentPropsWithRef<typeof Link>,
  "aria-current" | "data-active"
>;

function ActiveLink(props: ActiveLinkProps) {
  const { href, ...restProps } = props;
  const pathname = usePathname();
  const firstPathActive = href === `/${pathname.split("/")[1]}`;

  return (
    <Link
      href={href}
      aria-current={firstPathActive ? "page" : undefined}
      data-active={firstPathActive ? "true" : undefined}
      {...restProps}
    />
  );
}

export { ActiveLink };
export type { ActiveLinkProps };
