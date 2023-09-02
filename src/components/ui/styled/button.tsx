import React from 'react';
import Link from 'next/link';
import { LinkComponentProps } from '@/lib/next/types';
import clsx from '@/utils/css/clsx';

// common
// ----------------------------------------

type ButtonBaseProps = {
  disabled?: boolean;
  rightIcon?: React.ReactNode;
};

const baseClassName = clsx(
  'inline-flex items-center justify-center rounded-lg px-5 py-2 font-bold',
  'transition-colors duration-200 ease-out',
  'bg-primary-600 text-white',
  'hover:bg-primary-700',
  'active:bg-primary-700',
  'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-300',
);

// ----------------------------------------

type ButtonProps = React.ComponentPropsWithRef<'button'> & ButtonBaseProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { rightIcon, className, children, ...restProps } = props;

    return (
      <button
        className={clsx(
          baseClassName,
          'disabled:cursor-not-allowed disabled:bg-gray-disabled',
          className,
        )}
        {...restProps}
        ref={ref}
      >
        {rightIcon ? (
          <>
            <span>{children}</span>
            <span className="ml-2 inline-flex items-center">{rightIcon}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

// ----------------------------------------

type ButtonLinkProps = LinkComponentProps & ButtonBaseProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    const { rightIcon, disabled, className, children, ...restProps } = props;

    return (
      <Link
        className={clsx(
          baseClassName,
          disabled && 'pointer-events-none bg-gray-disabled',
          className,
        )}
        aria-disabled={disabled}
        {...restProps}
        ref={ref}
      >
        {rightIcon ? (
          <>
            <span>{children}</span>
            <span className="ml-2 inline-flex items-center">{rightIcon}</span>
          </>
        ) : (
          children
        )}
      </Link>
    );
  },
);

ButtonLink.displayName = 'ButtonLink';

// ----------------------------------------

export { Button, ButtonLink };