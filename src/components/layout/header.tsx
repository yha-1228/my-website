'use client';

import type { ComponentProps, CSSProperties } from 'react';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight, BsList, BsX } from 'react-icons/bs';
import useMediaQuery from '@/hooks/use-media-query';
import useScrollLock from '@/hooks/use-scroll-lock';
import { routes } from '@/routes';
import { tailwindFullConfig } from '@/tailwind-config';
import clsx from '@/utils/css/clsx';
import Container from '../ui/styled/container';

function ActiveNavLink(props: ComponentProps<'a'>) {
  const { href, ...restProps } = props;
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      data-active={active ? 'true' : undefined}
      {...restProps}
    />
  );
}

// ----------------------------------------

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== '/',
);

const headerHeightRem = '4rem';
const hederBorderBottomWidth = '1px';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMediaQuery({
    query: `(min-width: ${tailwindFullConfig.theme.screens.sm})`,
    callback: (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    },
  });

  useScrollLock({ enabled: isMobileMenuOpen });

  return (
    <header
      style={
        {
          '--header-height': headerHeightRem,
          '--header-border-bottom-width': hederBorderBottomWidth,
        } as CSSProperties
      }
      className="relative h-[var(--header-height)] border-b-[length:var(--header-border-bottom-width)] border-solid border-b-gray-light-300"
    >
      <Container as="nav">
        <div className="relative flex h-[calc(var(--header-height)-var(--header-border-bottom-width))] items-center justify-between">
          <Link
            href="/"
            className={clsx(
              'text-2xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Yuta Hasegawa
          </Link>

          {/* mobile only */}
          <button
            type="button"
            className={clsx(
              'flex size-9 items-center justify-center sm:hidden',
              'absolute -right-1.5 top-1/2 -translate-y-1/2',
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? 'メニューを開く' : 'メニューを閉じる'
            }
          >
            {isMobileMenuOpen ? (
              <BsX aria-hidden="true" className="size-8" />
            ) : (
              <BsList aria-hidden="true" className="size-8" />
            )}
          </button>

          {/* desktop only */}
          <ul className="hidden sm:flex">
            {routesWithoutHome.map((route) => (
              <li key={route.href}>
                <ActiveNavLink
                  href={route.href}
                  className={clsx(
                    'relative inline-flex h-[calc(var(--header-height)-var(--header-border-bottom-width))] items-center px-3',
                    'font-bold text-gray-foreground/70',
                    'transition-colors duration-200 ease-out',
                    "hover:text-primary-600 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:h-0.5 hover:before:w-full hover:before:bg-transparent hover:before:content-['']",
                    'active:bg-gray-light-100',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300',

                    'data-[active]:font-bold data-[active]:text-primary-600',
                    "data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:left-0 data-[active]:before:h-[3px] data-[active]:before:w-full data-[active]:before:bg-primary-600 data-[active]:before:content-['']",
                    'data-[active]:hover:text-primary-600 data-[active]:hover:before:bg-primary-600',
                  )}
                >
                  {route.label}
                </ActiveNavLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* mobile only */}
      <Container
        className={clsx(
          !isMobileMenuOpen && 'hidden',
          'sm:hidden',
          'absolute left-0 top-[var(--header-height)] z-mobile-menu h-[calc(100dvh-var(--header-height))] w-full bg-white',
        )}
      >
        <ul className="divide-y divide-solid divide-gray-light-200 py-3">
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveNavLink
                href={route.href}
                className={clsx(
                  'flex h-12 items-center justify-between font-bold',
                  '[&>span]:text-gray-foreground-weak [&>span]:data-[active]:text-primary-600',
                )}
              >
                <span>{route.label}</span>
                <BsChevronRight />
              </ActiveNavLink>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
