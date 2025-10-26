import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

type Variant = "zenn" | "note";

const variantClassNames = {
  zenn: "border text-[#3ea8ff] bg-white",
  note: "", // TODO:
} as const satisfies Record<Variant, string>;

interface TagProps extends ComponentProps<"div"> {
  variant: Variant;
}

function Tag(props: TagProps) {
  const { variant, className, ...restProps } = props;

  return (
    <div
      className={cn(
        "text-foreground-primary inline-flex items-center gap-2 rounded-full px-2.5 py-px text-sm",
        variantClassNames[variant],
        className,
      )}
      {...restProps}
    />
  );
}

export { Tag };
