import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

function Tag(props: ComponentProps<"div">) {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn(
        "text-foreground-primary inline-block rounded-sm bg-stone-100 px-1.5 text-xs whitespace-nowrap",
        className,
      )}
      {...restProps}
    />
  );
}

export { Tag };
