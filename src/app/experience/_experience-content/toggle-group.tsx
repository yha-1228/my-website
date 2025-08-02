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
        "text-base-foreground inline-flex h-9 flex-1 items-center justify-center bg-white px-3 text-sm first:rounded-l-md last:rounded-r-md sm:h-10 sm:text-base",
        cn(
          "border-y-base-light-300 border-y",
          "first:border-l-base-light-300 first:border-l",
          "last:border-r-base-light-300 last:border-r",
          "not-first:border-l-base-light-300 not-first:border-l",
        ),
        "hover:bg-base-light-100",
        cn(
          "[[aria-checked='true']]:bg-primary-700",
          "[[aria-checked='true']]:border-primary-700 [[aria-checked='true']]:border-l-primary-700 [[aria-checked='true']+*]:border-l-primary-700",
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
