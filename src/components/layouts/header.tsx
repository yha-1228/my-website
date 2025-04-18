"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ComponentProps,
  type CSSProperties,
  type MouseEvent,
  useRef,
  useState,
} from "react";
import { BsList, BsX } from "react-icons/bs";

import { MOBILE_MENU_ID } from "@/constants";
import { useKeydown } from "@/hooks/use-keydown";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOnRouteChange } from "@/hooks/use-on-route-change";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { routes } from "@/routes";
import { tailwindFullConfig } from "@/tailwind-config";
import { cn } from "@/utils/css/cn";
import { loopFocus } from "@/utils/dom/utils";

import { Container } from "../ui/styled/container";

function ActiveNavLink(props: ComponentProps<typeof Link>) {
  const { href, ...restProps } = props;
  const pathname = usePathname();
  const active = href === pathname;
  const firstPathActive = href === `/${pathname.split("/")[1]}`;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={firstPathActive ? "true" : undefined}
      {...restProps}
    />
  );
}

// ----------------------------------------

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== "/",
);

const hederBorderBottomWidth = tailwindFullConfig.theme.spacing.px;

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useKeydown((event) => {
    if (isMobileMenuOpen) {
      loopFocus(event, headerRef.current);
    }
  });

  useMediaQuery(
    `(min-width: ${tailwindFullConfig.theme.screens.sm})`,
    (event) => {
      if (isMobileMenuOpen) {
        if (event.matches) {
          setIsMobileMenuOpen(false);
        }
      }
    },
  );

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
    <header ref={headerRef} className="sticky top-0 z-header">
      <div
        style={
          {
            "--header-border-bottom-width": hederBorderBottomWidth,
          } as CSSProperties
        }
        className="relative h-header border-b-[length:var(--header-border-bottom-width)] border-solid border-b-base-light-300 bg-white"
      >
        <Container>
          <div className="relative flex h-[calc(theme(height.header)-var(--header-border-bottom-width))] items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold transition-colors duration-200 ease-out hover:text-base-foreground-weak"
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
                "absolute -right-1.5 top-1/2 -translate-y-1/2",
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
                    <ActiveNavLink
                      href={route.href}
                      className={cn(
                        "relative inline-flex h-[calc(theme(height.header)-var(--header-border-bottom-width))] items-center px-2.5 font-bold transition-colors duration-200 ease-out",
                        "hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-1 hover:before:w-full hover:before:bg-primary-600/20 hover:before:content-['']",
                        "data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:left-0 data-[active]:before:h-1 data-[active]:before:w-full data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                      )}
                    >
                      {route.label}
                    </ActiveNavLink>
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
            "absolute left-0 top-[theme(height.header)] w-full overflow-y-hidden bg-base-light-100 transition-[height,visibility] duration-200 ease-out",
            "invisible block h-0 data-[is-open]:visible data-[is-open]:h-[calc(100dvh-theme(height.header))]",
          )}
        >
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveNavLink
                href={route.href}
                className={cn(
                  "flex items-center font-bold justify-between py-3",
                  "hover:relative hover:bg-white hover:before:absolute hover:before:h-full hover:before:w-1 hover:before:bg-primary-600/20 hover:before:content-['']",
                  "data-[active]:relative data-[active]:bg-white data-[active]:before:absolute data-[active]:before:h-full data-[active]:before:w-1 data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                )}
                onClick={handleMobileNavLinkClick}
              >
                <Container>{route.label}</Container>
              </ActiveNavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
