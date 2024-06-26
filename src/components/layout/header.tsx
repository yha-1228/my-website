'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BsChevronRight, BsList, BsX } from 'react-icons/bs';
import ActiveLink from '@/lib/next/components/active-link';
import { routes } from '@/routes';
import clsx from '@/utils/css/clsx';
import createStyleAttr from '@/utils/react/create-style-attr';
import Container from '../ui/styled/container';

const routesWithoutHome = Object.values(routes).filter(
  (route) => route.href !== '/',
);

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="border-b border-solid border-b-gray-light-300"
      style={createStyleAttr({
        '--root-height': '4rem',
      })}
    >
      <Container as="nav">
        <div className="relative flex h-[var(--root-height)] items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold transition-colors duration-200 ease-out hover:text-gray-foreground-weak"
            onClick={() => setOpen(false)}
          >
            Yuta Hasegawa
          </Link>

          <button
            className={clsx(
              'flex size-9 items-center justify-center sm:hidden',
              'absolute -right-1.5 top-1/2 -translate-y-1/2',
            )}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'メニューを開く' : 'メニューを閉じる'}
          >
            <span aria-hidden="true">
              {open ? (
                <BsX className="size-8" />
              ) : (
                <BsList className="size-8" />
              )}
            </span>
          </button>
          <ul className="hidden sm:flex">
            {routesWithoutHome.map((route) => (
              <li key={route.href}>
                <ActiveLink
                  href={route.href}
                  className={clsx(
                    'relative inline-flex h-[var(--root-height)] items-center px-3',
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
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <ul
          className={clsx(
            open ? 'block' : 'hidden',
            'divide-y divide-solid divide-gray-light-200 py-3 sm:hidden',
          )}
        >
          {routesWithoutHome.map((route) => (
            <li key={route.href}>
              <ActiveLink
                href={route.href}
                className={clsx(
                  'flex h-12 items-center justify-between font-bold',
                  '[&>span]:text-gray-foreground-weak [&>span]:data-[active]:text-primary-600',
                )}
                onClick={() => setOpen(false)}
              >
                <span>{route.label}</span>
                <BsChevronRight />
              </ActiveLink>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
