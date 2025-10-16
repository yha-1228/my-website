import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

function Container(props: ComponentProps<"div">) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn("container mx-auto px-(--screen-margin)", className)}
      {...restProps}
    />
  );
}

export { Container };
