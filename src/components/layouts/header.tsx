"use client";

import Link from "next/link";
import { type CSSProperties, type MouseEvent, useRef } from "react";
import { BsList, BsX } from "react-icons/bs";

import { useKeydown } from "@/hooks/use-keydown";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOnRouteChange } from "@/hooks/use-on-route-change";
import { routes } from "@/routes";
import { loopFocus } from "@/utils/dom";
import { cn } from "@/utils/styling";

import { Container } from "../ui/styled/container";
import { ActiveLink } from "../ui/unstyled/active-link";
import { useMobileMenu } from "./hooks/use-mobile-menu";

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== "/",
);

const headerBorderBottomWidth = "1px";

export function Header() {
  const mobileMenu = useMobileMenu();

  const headerRef = useRef<HTMLDivElement>(null);
  useKeydown((event) => {
    if (mobileMenu.open) {
      loopFocus(event, headerRef.current);
    }
  });

  // `(min-width: breakpoint.sm)`
  useMediaQuery(`(min-width: 640px)`, (event) => {
    if (event.matches && mobileMenu.open) {
      mobileMenu.closeModal();
    }
  });

  useOnRouteChange(() => {
    if (mobileMenu.open) {
      mobileMenu.closeModal();
    }
  });

  const handleMobileNavLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.getAttribute("aria-current") === "page") {
      mobileMenu.closeModal();
    }
  };

  const handleHomeLinkClick = () => {
    mobileMenu.closeModal();
  };

  return (
    <header
      ref={headerRef}
      style={
        {
          "--header-border-bottom-width": headerBorderBottomWidth,
        } as CSSProperties
      }
      className={cn(
        "z-header sticky top-0",
        "border-b-base-light-300 h-(--height-header) border-b-[length:var(--header-border-bottom-width)] border-solid bg-white",
      )}
    >
      <Container>
        <div className="relative flex h-[calc(var(--height-header)-var(--header-border-bottom-width))] items-center justify-between">
          <Link
            href="/"
            className="hover:text-base-foreground-weak text-2xl font-bold transition-colors duration-200 ease-out"
            onClick={handleHomeLinkClick}
          >
            Yuta Hasegawa
          </Link>

          {/* mobile only */}
          <button
            {...mobileMenu.triggerProps}
            className={cn(
              "flex size-9 items-center justify-center sm:hidden",
              "absolute top-1/2 -right-1.5 -translate-y-1/2",
            )}
            aria-label={mobileMenu.open ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenu.open ? (
              <BsX aria-hidden="true" className="size-8" />
            ) : (
              <BsList aria-hidden="true" className="size-8" />
            )}
          </button>

          {/* desktop only */}
          <nav className="hidden sm:block">
            <ul className="flex">
              {routesWithoutHome.map((route) => (
                <li key={route.href}>
                  <ActiveLink
                    href={route.href}
                    className={cn(
                      "relative inline-flex h-[calc(var(--height-header)-var(--header-border-bottom-width))] items-center px-4 font-bold transition-colors duration-200 ease-out",
                      "hover:bg-base-light-100 active:bg-base-light-200",
                      "data-active:before:bg-primary-600 data-active:before:absolute data-active:before:bottom-0 data-active:before:left-0 data-active:before:h-1 data-active:before:w-full data-active:before:content-['']",
                    )}
                  >
                    {route.label}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {/* mobile only */}
      <nav className="sm:hidden" {...mobileMenu.contentProps}>
        <ul
          data-is-open={mobileMenu.open ? "true" : undefined}
          className={cn(
            // height, visibilityを同時にtransitionで切り替えることで
            // 高さのアニメーションを適用しつつ、閉じているときにフォーカスも無効にする
            "absolute top-(--height-header) left-0 w-full overflow-y-hidden bg-white transition-[height,visibility] duration-200 ease-out",
            "invisible block h-0 data-is-open:visible data-is-open:h-[calc(100dvh-(var(--height-header)))]",
          )}
        >
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveLink
                href={route.href}
                className={cn(
                  "flex items-center justify-between py-3 font-bold",
                  "hover:bg-base-light-100",
                  "data-active:relative",
                  "data-active:before:bg-primary-600 data-active:before:absolute data-active:before:h-full data-active:before:w-1.5 data-active:before:content-['']",
                )}
                onClick={handleMobileNavLinkClick}
              >
                <div className="px-6">{route.label}</div>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
