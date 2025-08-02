import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function FormHelperText(props: ComponentPropsWithRef<"p">) {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn("text-base-foreground-weak text-sm", className)}
      {...restProps}
    />
  );
}

export { FormHelperText };
