"use client";

import Link from "next/link";
import {
  type ComponentPropsWithRef,
  type MouseEvent,
  type PropsWithChildren,
  useState,
} from "react";

import { getContextAndHook } from "@/utils/react";
import { cn } from "@/utils/styling";

interface UseToggleGroupProps<T extends string = string> {
  initialSelectedValue: T;
}

function useToggleGroup<T extends string = string>({
  initialSelectedValue,
}: UseToggleGroupProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(initialSelectedValue);
  return { selectedValue, setSelectedValue };
}

type UseToggleGroupReturn<T extends string = string> = ReturnType<
  typeof useToggleGroup<T>
>;

const [useToggleGroupContext, ToggleGroupContext] =
  getContextAndHook<UseToggleGroupReturn>(
    "useToggleGroupContext",
    "ToggleGroupProvider",
  );

function ToggleGroupProvider({
  initialSelectedValue,
  children,
}: PropsWithChildren<UseToggleGroupProps>) {
  const value = useToggleGroup({ initialSelectedValue });

  return <ToggleGroupContext value={value}>{children}</ToggleGroupContext>;
}

// ----------------------------------------

interface ToggleGroupProps<T extends string = string>
  extends ComponentPropsWithRef<"div"> {
  initialSelectedValue: T;
}

function ToggleGroup<T extends string = string>(props: ToggleGroupProps<T>) {
  const { initialSelectedValue, className, ...restProps } = props;

  return (
    <ToggleGroupProvider initialSelectedValue={initialSelectedValue}>
      <div className={cn("flex", className)} {...restProps} />
    </ToggleGroupProvider>
  );
}

// ----------------------------------------

interface ToggleGroupItemProps<T extends string = string>
  extends Omit<ComponentPropsWithRef<typeof Link>, "role" | "aria-checked"> {
  value: T;
}

function ToggleGroupItem<T extends string = string>(
  props: ToggleGroupItemProps<T>,
) {
  const { value, className, onClick, ...restProps } = props;
  const { selectedValue, setSelectedValue } = useToggleGroupContext();

  const handleClick = (value: T, event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    setSelectedValue(value);
  };

  return (
    <Link
      role="radio"
      aria-checked={selectedValue === value}
      className={cn(
        "text-foreground-primary first:rounded-l-touchable last:rounded-r-touchable inline-flex h-9 flex-1 items-center justify-center bg-white px-3 text-sm sm:h-10 sm:text-base",
        cn(
          "border-y border-y-stone-300",
          "first:border-l first:border-l-stone-300",
          "last:border-r last:border-r-stone-300",
          "not-first:border-l not-first:border-l-stone-300",
        ),
        "hover:bg-stone-100",
        cn(
          "[[aria-checked='true']]:bg-foreground-primary",
          "[[aria-checked='true']]:border-foreground-primary [[aria-checked='true']]:border-l-foreground-primary [[aria-checked='true']+*]:border-l-foreground-primary",
          "[[aria-checked='true']]:text-white",
        ),
        className,
      )}
      scroll={false}
      onClick={(event) => handleClick(value, event)}
      {...restProps}
    />
  );
}

// ----------------------------------------

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
