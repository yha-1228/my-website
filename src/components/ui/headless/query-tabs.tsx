"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";

import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { Tabs, type TabsProps } from "./tabs";
import { type UseTabsProps } from "./tabs";

interface UseTabsWithQueryProps<T extends string> {
  name: string;
  values: [T, ...T[]];
  /**
   * @default values[0]
   */
  fallbackValue?: T;
}

function useTabsWithQuery<T extends string>({
  name,
  values,
  fallbackValue = values[0],
}: UseTabsWithQueryProps<T>) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get(name);

  const tabParamParseResult = z.enum(values).safeParse(tabParam);
  const tabValue = tabParamParseResult.success
    ? tabParamParseResult.data
    : fallbackValue;

  const updateSearchParams = useUpdateSearchParams();

  const tabsProps = {
    defaultIndex: values.indexOf(tabValue),
    onTabChange: (selectedIndex: number) => {
      updateSearchParams(name, values[selectedIndex]);
    },
  } as const satisfies UseTabsProps;

  return { tabsProps };
}

// ----------------------------------------

export interface QueryTabsProps<T extends string>
  extends UseTabsWithQueryProps<T>,
    Omit<TabsProps, "defaultIndex" | "onTabChange"> {}

export function QueryTabs<T extends string>(props: QueryTabsProps<T>) {
  const { name, values, fallbackValue, ...rest } = props;
  const { tabsProps } = useTabsWithQuery({ name, values, fallbackValue });

  return <Tabs {...tabsProps} {...rest} />;
}
