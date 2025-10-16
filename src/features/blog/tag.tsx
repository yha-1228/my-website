import { type ComponentProps } from "react";

import { cn } from "@/utils/styling";

type Variant = "zenn" | "withinOneMonth";

const variantClassNames = {
  zenn: "*:data-[slot=dot]:hidden border text-[#3ea8ff] bg-white",
  withinOneMonth:
    "*:data-[slot=dot]:bg-amber-400 border border-stone-300 bg-white",
} as const satisfies Record<Variant, string>;

interface TagProps extends ComponentProps<"div"> {
  variant: Variant;
}

function Tag(props: TagProps) {
  const { variant, className, children, ...restProps } = props;

  return (
    <div
      className={cn(
        "text-foreground-primary inline-flex items-center gap-2 rounded-full px-2.5 py-px text-sm",
        variantClassNames[variant],
        className,
      )}
      {...restProps}
    >
      <span
        className="size-2 rounded-full"
        aria-hidden="true"
        data-slot="dot"
      />
      {children}
    </div>
  );
}

export { Tag };
