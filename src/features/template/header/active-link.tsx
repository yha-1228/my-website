"use client";

import { usePathname } from "next/navigation";
import { type ElementType, type ReactNode } from "react";

import { type PropsWithAs } from "@/types/react";

type ActiveLinkProps<TAs extends ElementType> = Omit<
  PropsWithAs<TAs, "a">,
  "aria-current" | "data-active" | "children"
> & {
  children?: ReactNode | ((active: boolean) => ReactNode);
};

function ActiveLink<TAs extends ElementType>(props: ActiveLinkProps<TAs>) {
  const { as: Comp = "a", href, children, ...restProps } = props;
  const pathname = usePathname();
  const firstPathActive = href === `/${pathname.split("/")[1]}`;

  return (
    <Comp
      href={href}
      aria-current={firstPathActive ? "page" : undefined}
      data-active={firstPathActive ? "true" : undefined}
      {...restProps}
    >
      {children instanceof Function ? children(firstPathActive) : children}
    </Comp>
  );
}

export { ActiveLink };
export type { ActiveLinkProps };
