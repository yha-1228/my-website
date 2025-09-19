"use client";

import Link from "next/link";
import { type CSSProperties, type MouseEvent, useRef } from "react";
import { BsList, BsX } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

import { ActiveLink } from "./active-link";
import { loopFocus } from "./loop-focus";
import { useKeydown } from "./use-keydown";
import { useMediaQuery } from "./use-media-query";
import { useMobileMenu } from "./use-mobile-menu";
import { useOnRouteChange } from "./use-on-route-change";

const routesWithoutHome = Object.values(routes)
  .filter((route) => route.href !== "/")
  .filter((route) => route.hierarchy === 1)
  .filter((route) => route.href !== "/portfolio");
const headerBorderBottomWidth = "1px";

export function Header() {
  const mobileMenu = useMobileMenu();

  const headerRef = useRef<HTMLDivElement>(null);
  useKeydown((event) => {
    if (mobileMenu.open) {
      loopFocus(event, headerRef.current);
    }
  });

  // `(min-width: breakpoint.md)`
  useMediaQuery(`(min-width: 768px)`, (event) => {
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
              "hover:bg-base-light-100 flex size-12 items-center justify-center rounded-full bg-white md:hidden",
              "absolute top-1/2 -right-[0.8rem] -translate-y-1/2",
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
          <nav className="hidden md:block">
            <ul className="flex">
              {routesWithoutHome.map((route) => (
                <li key={route.href}>
                  <ActiveLink
                    href={route.href}
                    className={cn(
                      "relative inline-flex h-[calc(var(--height-header)-var(--header-border-bottom-width))] items-center px-4 font-bold transition-colors duration-200 ease-out",
                      "hover:bg-base-light-100 active:bg-base-light-200",
                      "data-active:before:bg-primary-600 data-active:before:absolute data-active:before:bottom-0 data-active:before:left-0 data-active:before:h-1 data-active:before:w-full data-active:before:content-['']",
                      route.protected && "flex gap-2",
                    )}
                  >
                    {route.protected && <FaLock />}
                    {route.label}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {/* mobile only */}
      <nav className="md:hidden" {...mobileMenu.contentProps}>
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
                <div
                  className={cn(
                    "px-6",
                    route.protected && "flex items-center gap-2",
                  )}
                >
                  {route.protected && <FaLock />}
                  {route.label}
                </div>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
