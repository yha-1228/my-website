import { type ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/utils/css/cn";

const Tag = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        className={cn(
          "bg-base-light-100 text-base-foreground-weak inline-block rounded-full px-3.5 py-0.5 text-sm",
          className,
        )}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
