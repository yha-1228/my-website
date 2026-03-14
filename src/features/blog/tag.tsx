import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

type Variant = "zenn" | "note";

const variantClassNames = {
  zenn: "border text-[#3ea8ff] bg-white",
  note: "bg-foreground-primary text-white",
} as const satisfies Record<Variant, string>;

const variantTexts = {
  zenn: "Zenn",
  note: "note",
} as const satisfies Record<Variant, string>;

interface TagProps extends Omit<ComponentProps<"div">, "children"> {
  variant: Variant;
}

function Tag(props: TagProps) {
  const { variant, className, ...restProps } = props;

  return (
    <div
      className={cn(
        "text-foreground-primary inline-flex h-7 items-center gap-2 rounded-sm px-1.5 text-sm",
        variantClassNames[variant],
        className,
      )}
      {...restProps}
    >
      {variantTexts[variant]}
    </div>
  );
}

export { Tag };
