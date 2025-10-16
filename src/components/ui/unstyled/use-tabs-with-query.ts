"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";

import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { type UseTabsProps } from "./tabs";

export interface UseTabsWithQueryProps<T extends string> {
  name: string;
  values: [T, ...T[]];
  /**
   * @default values[0]
   */
  fallbackValue?: T;
}

export function useTabsWithQuery<T extends string>({
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
