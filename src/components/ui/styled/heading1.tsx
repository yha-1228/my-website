import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/css/cn";

function Heading1(props: ComponentPropsWithRef<"h1">) {
  const { className, ...restProps } = props;

  return (
    <h1
      className={cn("text-3xl leading-tight font-bold sm:text-4xl", className)}
      {...restProps}
    />
  );
}

export { Heading1 };
