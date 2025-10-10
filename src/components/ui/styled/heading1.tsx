import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function Heading1(props: ComponentPropsWithRef<"h2">) {
  const { className, ...restProps } = props;

  return (
    <h1
      className={cn("text-2xl leading-tight font-bold sm:text-3xl", className)}
      {...restProps}
    />
  );
}

export { Heading1 };
