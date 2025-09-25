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
        "text-foreground-primary inline-flex h-9 flex-1 items-center justify-center bg-white px-3 text-sm first:rounded-l-md last:rounded-r-md sm:h-10 sm:text-base",
        cn(
          "border-y border-y-gray-300",
          "first:border-l first:border-l-gray-300",
          "last:border-r last:border-r-gray-300",
          "not-first:border-l not-first:border-l-gray-300",
        ),
        "hover:bg-gray-100",
        cn(
          "[[aria-checked='true']]:bg-brand-active",
          "[[aria-checked='true']]:border-brand-active [[aria-checked='true']]:border-l-brand-active [[aria-checked='true']+*]:border-l-brand-active",
          "[[aria-checked='true']]:text-white",
          "[[aria-checked='true']]:font-bold",
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
