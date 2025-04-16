import { type ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/utils/css/cn";

const Tag = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        className={cn(
          "inline-block rounded-full bg-base-light-100 px-3.5 py-0.5 text-sm text-base-foreground-weak",
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
