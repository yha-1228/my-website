import { type ComponentPropsWithRef } from "react";

import { classVariants, cn } from "@/utils/styling";

interface LabelVariantsProps {
  /**
   * @default false
   */
  required?: boolean;
}

const getVariantClass = classVariants<LabelVariantsProps>(
  cn("block font-bold"),
  {
    required: {
      true: cn("flex items-center"),
      false: "",
    },
  },
);

interface LabelProps
  extends ComponentPropsWithRef<"label">,
    LabelVariantsProps {}

function Label(props: LabelProps) {
  const { className, children, required = false, ...restProps } = props;

  return (
    <label
      className={cn(getVariantClass({ required }), className)}
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
