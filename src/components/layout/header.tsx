import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { LinkComponentProps } from '@/lib/next/types';
import Container from '../ui/container';

type NavLinkProps = LinkComponentProps;

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { href, className, ...restProps } = props;
    const router = useRouter();
    const current = router.pathname === href;

    return (
      <Link
        className={twMerge(
          'relative inline-flex items-center h-14 font-bold text-gray-500',
          'hover:text-primary-600',
          current &&
            "text-primary-600 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-primary-600 before:content-['']",
          className,
        )}
        href={href}
        {...restProps}
        ref={ref}
      />
    );
  },
);

NavLink.displayName = 'NavLink';

// ----------------------------------------

const linkItems: NavLinkProps[] = [
  {
    href: '/experience',
    children: '職務経歴',
  },
];

export default function Header() {
  return (
    <header className="flex h-14 items-center border-b border-solid border-b-gray-light-weak bg-gray-lightest">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:underline">
            Yuta Hasegawa
          </Link>

          <ul className="flex space-x-5">
            {linkItems.map((linkItem) => (
              <li key={`${linkItem.href}`}>
                <NavLink {...linkItem} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
