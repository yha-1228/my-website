"use client";

import React, {
  type ComponentProps,
  type CSSProperties,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsList, BsX } from "react-icons/bs";
import { MOBILE_MENU_ID, TOP_LOGO_ID } from "@/constants";
import { useKeydown } from "@/hooks/use-keydown";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOnRouteChange } from "@/hooks/use-on-route-change";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { routes } from "@/routes";
import { tailwindFullConfig } from "@/tailwind-config";
import { cn } from "@/utils/css/cn";
import { Container } from "../ui/styled/container";
import { LoopFocusContainer } from "../ui/unstyled/loop-focus-container";

function ActiveNavLink(props: ComponentProps<typeof Link>) {
  const { href, ...restProps } = props;
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
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
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <LoopFocusContainer as="header" className="sticky top-0 z-header">
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
              id={TOP_LOGO_ID}
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
              <ul className="hidden sm:flex">
                {routesWithoutHome.map((route) => (
                  <li key={route.href}>
                    <ActiveNavLink
                      href={route.href}
                      className={cn(
                        "relative inline-flex h-[calc(theme(height.header)-var(--header-border-bottom-width))] items-center px-3",
                        "font-bold text-base-foreground/70",
                        "transition-colors duration-200 ease-out",
                        "hover:text-primary-600 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-0.5 hover:before:w-full hover:before:bg-transparent hover:before:content-['']",
                        "active:bg-base-light-100",
                        "data-[active]:font-bold data-[active]:text-primary-600",
                        "data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:left-0 data-[active]:before:h-[3px] data-[active]:before:w-full data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                        "data-[active]:hover:text-primary-600 data-[active]:hover:before:bg-primary-600",
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
          className={cn(
            "sm:hidden",
            // height, visibilityを同時にtransitionで切り替えることで
            // 高さのアニメーションを適用しつつ、閉じているときにフォーカスも無効にする
            "absolute left-0 top-[theme(height.header)] w-full overflow-y-hidden bg-white pt-2.5 transition-[height,visibility] duration-200 ease-out",
            isMobileMenuOpen
              ? "visible h-[calc(100dvh-theme(height.header))]"
              : "invisible block h-0",
          )}
        >
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveNavLink
                href={route.href}
                className={cn(
                  "flex items-center justify-between py-2.5 text-base-foreground-weak",
                  "hover:bg-base-light-100",
                  "data-[active]:relative data-[active]:font-bold data-[active]:text-primary-600",
                )}
              >
                <Container>{route.label}</Container>
              </ActiveNavLink>
            </li>
          ))}
        </ul>
      </div>
    </LoopFocusContainer>
  );
}
