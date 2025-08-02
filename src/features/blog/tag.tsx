import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function Tag(props: ComponentPropsWithRef<"div">) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn(
        "bg-base-light-100 text-base-foreground inline-block rounded-sm px-2 py-0.5 text-sm",
        className,
      )}
      {...restProps}
    />
  );
}

export { Tag };
