import { type ComponentPropsWithRef,forwardRef } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

import { cn } from "@/utils/css/cn";

const FormErrorMessage = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithRef<"p">
>((props, ref) => {
  const { className, children, ...restProps } = props;

  return (
    <p
      className={cn("flex items-center text-sm text-danger-500", className)}
      {...restProps}
      ref={ref}
    >
      <BsFillExclamationCircleFill aria-hidden="true" />
      <span className="ml-1.5">{children}</span>
    </p>
  );
});

FormErrorMessage.displayName = "FormErrorMessage";

export { FormErrorMessage };
