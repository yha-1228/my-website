import { type ComponentPropsWithRef } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

import { cn } from "@/utils/styling";

function FormErrorMessage(props: ComponentPropsWithRef<"p">) {
  const { className, children, ...restProps } = props;

  return (
    <p
      className={cn("text-danger-base flex items-center text-sm", className)}
      {...restProps}
    >
      <BsFillExclamationCircleFill aria-hidden="true" />
      <span className="ml-1.5">{children}</span>
    </p>
  );
}

export { FormErrorMessage };
