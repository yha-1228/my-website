"use client";

import { TabsProvider, type TabsProviderProps } from "./tabs";
import {
  useTabsWithQuery,
  type UseTabsWithQueryProps,
} from "./use-tabs-with-query";

export interface TabsQueryProviderProps<T extends string>
  extends UseTabsWithQueryProps<T>,
    Omit<TabsProviderProps, "defaultIndex" | "onTabChange"> {}

export function TabsQueryProvider<T extends string>(
  props: TabsQueryProviderProps<T>,
) {
  const { children, className, ...rest } = props;
  const { tabsProps } = useTabsWithQuery(rest);

  return (
    <TabsProvider {...tabsProps} className={className}>
      {children}
    </TabsProvider>
  );
}
