"use client";

import { useRouter } from "next/navigation";
import { type ComponentPropsWithRef, useEffect, useTransition } from "react";

import { useTransitionUpdateContext } from "@/contexts/transition-context";
import { cn } from "@/utils/styling";

// ----------------------------------------

function ToggleGroup(props: ComponentPropsWithRef<"div">) {
  const { className, ...restProps } = props;

  return <div className={cn("flex", className)} {...restProps} />;
}

// ----------------------------------------

interface ToggleGroupItemProps
  extends Omit<ComponentPropsWithRef<"button">, "type" | "onClick"> {
  checked?: boolean;
  href: string;
}

function ToggleGroupItem(props: ToggleGroupItemProps) {
  const { checked, href, className, ...restProps } = props;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setIsPending } = useTransitionUpdateContext();

  useEffect(() => {
    setIsPending(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const handleClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      type="button"
      data-checked={checked}
      onClick={handleClick}
      className={cn(
        "text-foreground-primary first:rounded-l-touchable last:rounded-r-touchable inline-flex h-9 flex-1 items-center justify-center bg-white px-3 text-sm transition-colors sm:h-10 sm:text-base",
        cn(
          "border-y border-y-stone-300",
          "first:border-l first:border-l-stone-300",
          "last:border-r last:border-r-stone-300",
          "not-first:border-l not-first:border-l-stone-300",
        ),
        "hover:bg-stone-100 active:bg-stone-100",
        cn(
          "[[data-checked='true']]:bg-foreground-primary",
          "[[data-checked='true']]:border-foreground-primary [[data-checked='true']]:border-l-foreground-primary [[data-checked='true']+*]:border-l-foreground-primary",
          "[[data-checked='true']]:text-white",
        ),
        className,
      )}
      {...restProps}
    />
  );
}

// ----------------------------------------

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps };
