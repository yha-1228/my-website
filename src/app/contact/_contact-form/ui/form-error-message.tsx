import { CircleAlert } from "lucide-react";
import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/styling";

function FormErrorMessage(props: ComponentPropsWithRef<"p">) {
  const { className, children, ...restProps } = props;

  return (
    <p
      className={cn("text-danger-base flex items-center text-sm", className)}
      {...restProps}
    >
      <CircleAlert className="size-4" />
      <span className="ml-1.5">{children}</span>
    </p>
  );
}

export { FormErrorMessage };
