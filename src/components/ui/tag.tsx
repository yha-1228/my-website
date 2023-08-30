import React from 'react';
import { twMerge } from 'tailwind-merge';

type TagProps = React.ComponentPropsWithRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={twMerge(
        'inline-block rounded-full text-gray-foreground-weak bg-gray-light-100 px-3.5 py-0.5 text-sm',
        className,
      )}
      {...restProps}
      ref={ref}
    />
  );
});

Tag.displayName = 'Tag';

export default Tag;