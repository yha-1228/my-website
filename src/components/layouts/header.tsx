"use client";

import Link from "next/link";
import { type CSSProperties, type MouseEvent, useRef, useState } from "react";
import { BsList, BsX } from "react-icons/bs";

import { MOBILE_MENU_ID } from "@/constants";
import { useKeydown } from "@/hooks/use-keydown";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOnRouteChange } from "@/hooks/use-on-route-change";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { routes } from "@/routes";
import { cn } from "@/utils/css/cn";
import { loopFocus } from "@/utils/dom/utils";

import { Container } from "../ui/styled/container";
import { ActiveLink } from "../ui/unstyled/active-link";

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== "/",
);

const hederBorderBottomWidth = "1px";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useKeydown((event) => {
    if (isMobileMenuOpen) {
      loopFocus(event, headerRef.current);
    }
  });

  useMediaQuery(`(min-width: var(--breakpoint-sm))`, (event) => {
    if (isMobileMenuOpen) {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    }
  });

  useScrollLock({ enabled: isMobileMenuOpen });

  useOnRouteChange(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  const handleMobileNavLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.getAttribute("aria-current") === "page") {
      setIsMobileMenuOpen(false);
    }
  };

  useKeydown((event) => {
    if (isMobileMenuOpen) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    }
  });

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="z-header sticky top-0">
      <div
        style={
          {
            "--header-border-bottom-width": hederBorderBottomWidth,
          } as CSSProperties
        }
        className="border-b-base-light-300 relative h-(--height-header) border-b-[length:var(--header-border-bottom-width)] border-solid bg-white"
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
              type="button"
              ref={mobileMenuButtonRef}
              className={cn(
                "flex size-9 items-center justify-center sm:hidden",
                "absolute top-1/2 -right-1.5 -translate-y-1/2",
              )}
              onClick={handleMobileMenuToggle}
              aria-label={
                isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              {isMobileMenuOpen ? (
                <BsX aria-hidden="true" className="size-8" />
              ) : (
                <BsList aria-hidden="true" className="size-8" />
              )}
            </button>

            {/* desktop only */}
            <nav>
              <ul className="hidden sm:flex sm:space-x-3.5">
                {routesWithoutHome.map((route) => (
                  <li key={route.href}>
                    <ActiveLink
                      href={route.href}
                      className={cn(
                        "relative inline-flex h-[calc(var(--height-header)-var(--header-border-bottom-width))] items-center px-2.5 font-bold transition-colors duration-200 ease-out",
                        "hover:before:bg-primary-600/20 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-1 hover:before:w-full hover:before:content-['']",
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
        <ul
          id={MOBILE_MENU_ID}
          data-is-open={isMobileMenuOpen ? "true" : undefined}
          className={cn(
            "sm:hidden",
            // height, visibilityを同時にtransitionで切り替えることで
            // 高さのアニメーションを適用しつつ、閉じているときにフォーカスも無効にする
            "bg-base-light-100 absolute top-(--height-header) left-0 w-full overflow-y-hidden transition-[height,visibility] duration-200 ease-out",
            "invisible block h-0 data-is-open:visible data-is-open:h-[calc(100dvh-(var(--height-header)))]",
          )}
        >
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveLink
                href={route.href}
                className={cn(
                  "flex items-center justify-between py-3 font-bold",
                  "hover:before:bg-primary-600/20 hover:relative hover:bg-white hover:before:absolute hover:before:h-full hover:before:w-1 hover:before:content-['']",
                  "data-active:before:bg-primary-600 data-active:relative data-active:bg-white data-active:before:absolute data-active:before:h-full data-active:before:w-1 data-active:before:content-['']",
                )}
                onClick={handleMobileNavLinkClick}
              >
                <Container>{route.label}</Container>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
