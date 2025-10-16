import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

function FormHelperText(props: ComponentProps<"p">) {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn("text-foreground-secondary text-sm", className)}
      {...restProps}
    />
  );
}

export { FormHelperText };
