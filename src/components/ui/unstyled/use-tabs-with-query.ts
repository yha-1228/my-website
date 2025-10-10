import { useSearchParams } from "next/navigation";
import { z } from "zod";

import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { type TabsProps } from "./tabs";

export function useTabsWithQuery<T extends string>(
  name: string,
  values: [T, ...T[]],
  fallbackValue: T = values[0],
) {
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
  } as const satisfies Partial<TabsProps>;

  return { tabsProps };
}
