import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/css/cn";

function Tag(props: ComponentPropsWithRef<"div">) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn(
        "bg-base-light-100 text-base-foreground-weak inline-block rounded-full px-3.5 py-0.5 text-sm",
        className,
      )}
      {...restProps}
    />
  );
}

export { Tag };
