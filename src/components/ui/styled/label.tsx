import { type ComponentPropsWithRef } from "react";

import { cn } from "@/utils/css/cn";

interface LabelProps extends ComponentPropsWithRef<"label"> {
  required?: boolean;
}

function Label(props: LabelProps) {
  const { className, children, required, ...restProps } = props;

  return (
    <label
      className={cn(
        "block font-bold",
        required && "flex items-center",
        className,
      )}
      {...restProps}
    >
      {required ? (
        <>
          <span>{children}</span>
          <span className="bg-danger-600 ml-1.5 rounded-xs px-[0.35rem] py-[0.05rem] text-xs text-white">
            必須
          </span>
        </>
      ) : (
        children
      )}
    </label>
  );
}

export { Label, type LabelProps };
