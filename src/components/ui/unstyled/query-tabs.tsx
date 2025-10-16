"use client";

import { Tabs, type TabsProps } from "./tabs";
import {
  useTabsWithQuery,
  type UseTabsWithQueryProps,
} from "./use-tabs-with-query";

export interface QueryTabsProps<T extends string>
  extends UseTabsWithQueryProps<T>,
    Omit<TabsProps, "defaultIndex" | "onTabChange"> {}

export function QueryTabs<T extends string>(props: QueryTabsProps<T>) {
  const { children, className, ...rest } = props;
  const { tabsProps } = useTabsWithQuery(rest);

  return (
    <Tabs {...tabsProps} className={className}>
      {children}
    </Tabs>
  );
}
