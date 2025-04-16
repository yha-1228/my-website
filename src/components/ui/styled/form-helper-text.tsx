import { type ComponentPropsWithRef,forwardRef } from "react";

import { cn } from "@/utils/css/cn";

const FormHelperText = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithRef<"p">
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn("text-sm text-base-foreground-weak", className)}
      {...restProps}
      ref={ref}
    />
  );
});

FormHelperText.displayName = "FormHelperText";

export { FormHelperText };
