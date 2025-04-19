import { type ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/utils/css/cn";

const Heading2 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<"h2">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <h2
        className={cn("text-xl leading-tight font-bold sm:text-2xl", className)}
        {...restProps}
        ref={ref}
      />
    );
  },
);

Heading2.displayName = "Heading2";

export { Heading2 };
