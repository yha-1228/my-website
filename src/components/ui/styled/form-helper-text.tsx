import { type ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/utils/css/cn";

const FormHelperText = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithRef<"p">
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn("text-base-foreground-weak text-sm", className)}
      {...restProps}
      ref={ref}
    />
  );
});

FormHelperText.displayName = "FormHelperText";

export { FormHelperText };
