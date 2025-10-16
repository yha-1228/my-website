import { type ComponentPropsWithRef, type ReactNode, useId } from "react";

import { cn } from "@/utils/styling";

interface ToggleGroupProps
  extends Omit<ComponentPropsWithRef<"div">, "aria-labelledby"> {
  labelText: ReactNode;
  labelClassName?: string;
  groupClassName?: string;
}

function ToggleGroup(props: ToggleGroupProps) {
  const id = useId();

  const {
    labelText,
    labelClassName,
    groupClassName,
    className,
    children,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-4 sm:flex-col sm:items-stretch sm:gap-1.5",
        className,
      )}
      role="radiogroup"
      aria-labelledby={id}
      {...rest}
    >
      <label
        className={cn("font-bold whitespace-nowrap", labelClassName)}
        id={id}
      >
        {labelText}
      </label>
      <div role="group" className={cn("flex w-full sm:w-auto", groupClassName)}>
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------

interface ToggleGroupItemProps
  extends Omit<
    ComponentPropsWithRef<"button">,
    "type" | "aria-checked" | "role"
  > {
  checked?: boolean;
}

function ToggleGroupItem(props: ToggleGroupItemProps) {
  const { checked, className, ...restProps } = props;

  return (
    <button
      type="button"
      aria-checked={checked}
      role="radio"
      className={cn(
        "text-foreground-primary first:rounded-l-touchable last:rounded-r-touchable inline-flex h-8 flex-1 items-center justify-center bg-white px-3 text-sm whitespace-nowrap transition-colors sm:h-10 sm:text-base",
        cn(
          "border-y border-y-stone-300",
          "first:border-l first:border-l-stone-300",
          "last:border-r last:border-r-stone-300",
          "not-first:border-l not-first:border-l-stone-300",
        ),
        "hover:bg-stone-100 active:bg-stone-100",
        cn(
          "aria-checked:bg-foreground-primary",
          "aria-checked:border-foreground-primary aria-checked:border-l-foreground-primary [[aria-checked='true']+*]:border-l-foreground-primary",
          "aria-checked:text-white",
        ),
        className,
      )}
      {...restProps}
    />
  );
}

// ----------------------------------------

export {
  ToggleGroup,
  type ToggleGroupProps,
  ToggleGroupItem,
  type ToggleGroupItemProps,
};
