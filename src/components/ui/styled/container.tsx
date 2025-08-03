import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function Container(props: ComponentPropsWithRef<"div">) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn("container mx-auto px-(--screen-margin)", className)}
      {...restProps}
    />
  );
}

export { Container };
