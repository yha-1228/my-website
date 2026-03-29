import { type ElementTypeOf, type PropsWithAs } from "@/types/react";
import { cn } from "@/utils/styling";

function Heading1<TAs extends ElementTypeOf<"h1" | "span">>(
  props: PropsWithAs<TAs, "h1">,
) {
  const { as: Comp = "h1", className, ...restProps } = props;

  return (
    <Comp
      className={cn("text-2xl leading-tight font-bold sm:text-3xl", className)}
      {...restProps}
    />
  );
}

export { Heading1 };
