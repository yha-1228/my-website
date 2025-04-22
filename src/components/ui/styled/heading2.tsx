import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function Heading2(props: ComponentPropsWithRef<"h2">) {
  const { className, ...restProps } = props;

  return (
    <h2
      className={cn("text-xl leading-tight font-bold sm:text-2xl", className)}
      {...restProps}
    />
  );
}

export { Heading2 };
