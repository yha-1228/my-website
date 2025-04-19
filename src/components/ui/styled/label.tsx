import { type ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/utils/css/cn";

interface LabelProps extends ComponentPropsWithRef<"label"> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { className, children, required, ...restProps } = props;

  return (
    <label
      className={cn(
        "block font-bold",
        required && "flex items-center",
        className,
      )}
      {...restProps}
      ref={ref}
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
});

Label.displayName = "LabelProps";

export { Label, type LabelProps };
