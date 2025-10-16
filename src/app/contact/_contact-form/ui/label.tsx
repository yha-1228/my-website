import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

interface LabelProps extends ComponentProps<"label"> {
  /**
   * @default false
   */
  required?: boolean;
}

function Label(props: LabelProps) {
  const { className, children, required = false, ...restProps } = props;

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
          <span className="text-foreground-primary ml-2 rounded-full bg-[black]/8 px-2 text-sm font-normal">
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
