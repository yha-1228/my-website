"use client";

import {
  Children,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { getContextAndHook } from "@/utils/react";

// ----------------------------------------

function useNode<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);

  const ref = useCallback((node: T) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [ref, node] as const;
}

function getTabId(index: number, id: string) {
  return `${id}-tab-${index}`;
}

function getPanelId(index: number, id: string) {
  return `${id}-panel-${index}`;
}

// TabsRoot
// ----------------------------------------

interface UseTabsProps {
  /**
   * @default 0
   */
  defaultIndex?: number;
  onTabChange?: (selectedIndex: number) => void;
}

function useTabs(props: UseTabsProps) {
  const { defaultIndex = 0, onTabChange } = props;

  const id = useId();

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return { id, activeIndex, setActiveIndex, onTabChange };
}

type UseTabsReturn = ReturnType<typeof useTabs>;

// ----------------------------------------

interface TabsProviderProps extends UseTabsProps {
  children: ReactNode;
  className?: string;
}

const [useTabsContext, TabsContext] = getContextAndHook<UseTabsReturn>(
  "useTabsContext",
  "TabsProvider",
);

/**
 * @example
 * ```tsx
 * function Example() {
 *   return (
 *     <Tabs>
 *       <TabList className="*:data-[selected=true]:font-bold">
 *         <Tab>Apple</Tab>
 *         <Tab>Banana</Tab>
 *         <Tab>Melon</Tab>
 *       </TabList>
 *       <PanelList>
 *         <Panel>Apple is Lorem ipsum dolor sit.</Panel>
 *         <Panel>Banana is Lorem ipsum dolor sit.</Panel>
 *         <Panel>Melon is Lorem ipsum dolor sit.</Panel>
 *       </PanelList>
 *     </Tabs>
 *   );
 * }
 * ```
 */
function TabsProvider(props: TabsProviderProps) {
  const { children, className, ...useTabsProps } = props;
  const value = useTabs(useTabsProps);

  return (
    <TabsContext value={value}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}

// ----------------------------------------

interface TabContextValue {
  index: number;
  lastIndex: number;
  firstTabElement: HTMLButtonElement;
  lastTabElement: HTMLButtonElement;
}

const [useTabContext, TabContext] = getContextAndHook<TabContextValue>(
  "useTabContext",
  "TabList",
);

type TabListProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "role" | "aria-orientation"
>;

function TabList(props: TabListProps) {
  const { children, ...rest } = props;
  const lastTabElementIndex = Children.count(children) - 1;
  const [ref, tabElement] = useNode<HTMLDivElement>();
  const firstTabElement = tabElement?.firstElementChild;
  const lastTabElement = tabElement?.lastElementChild;

  return (
    <div role="tablist" aria-orientation="horizontal" {...rest} ref={ref}>
      {Children.map(children, (children, index) => (
        <TabContext
          key={index}
          value={{
            index,
            lastIndex: lastTabElementIndex,
            firstTabElement: firstTabElement as HTMLButtonElement,
            lastTabElement: lastTabElement as HTMLButtonElement,
          }}
        >
          {children}
        </TabContext>
      ))}
    </div>
  );
}

// Tab
// ----------------------------------------

type TabProps = Omit<
  ComponentPropsWithoutRef<"button">,
  | "tabIndex"
  | "onClick"
  | "onKeyDown"
  | "aria-selected"
  | "aria-controls"
  | "id"
  | "type"
  | "role"
>;

function Tab(props: TabProps) {
  const { activeIndex, setActiveIndex, id, onTabChange } = useTabsContext();
  const { index, lastIndex, firstTabElement, lastTabElement } = useTabContext();

  const actionTabChange = (selectedIndex: number) => {
    if (selectedIndex !== activeIndex) {
      setActiveIndex(selectedIndex);
      onTabChange?.(selectedIndex);
    }
  };

  const handleClick = () => {
    actionTabChange(index);
  };

  const ref = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      const nextTabElement = ref.current?.nextElementSibling;

      if (nextTabElement instanceof HTMLButtonElement) {
        actionTabChange(index + 1);
        nextTabElement.focus();
      } else {
        actionTabChange(0);
        firstTabElement.focus();
      }
    }

    if (event.key === "ArrowLeft") {
      const prevTabElement = ref.current?.previousElementSibling;

      if (prevTabElement instanceof HTMLButtonElement) {
        actionTabChange(index - 1);
        prevTabElement.focus();
      } else {
        actionTabChange(lastIndex);
        lastTabElement.focus();
      }
    }

    if (event.key === "Home") {
      actionTabChange(0);
      firstTabElement.focus();
    }

    if (event.key === "End") {
      actionTabChange(lastIndex);
      lastTabElement.focus();
    }

    if (event.key === "Enter") {
      actionTabChange(index);
    }
  };

  const selected = index === activeIndex;

  return (
    <button
      ref={ref}
      tabIndex={selected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-selected={selected}
      aria-controls={getPanelId(index, id)}
      data-selected={selected}
      id={getTabId(index, id)}
      type="button"
      role="tab"
      {...props}
    />
  );
}

// PanelList
// ----------------------------------------

interface PanelContextValue {
  index: number;
}

const [usePanelContext, PanelContext] = getContextAndHook<PanelContextValue>(
  "usePanelContext",
  "PanelList",
);

interface PanelListProps {
  children: ReactNode;
}

function PanelList({ children }: PanelListProps) {
  return (
    <>
      {Children.map(children, (children, index) => (
        <PanelContext key={index} value={{ index }}>
          {children}
        </PanelContext>
      ))}
    </>
  );
}

// Panel
// ----------------------------------------

type PanelProps = Omit<
  ComponentPropsWithRef<"div">,
  "role" | "aria-labelledby" | "id"
>;

function Panel(props: PanelProps) {
  const { children, ...rest } = props;
  const { id, activeIndex } = useTabsContext();
  const { index } = usePanelContext();
  const selected = index === activeIndex;

  return (
    <div
      role="tabpanel"
      aria-labelledby={getTabId(index, id)}
      id={getPanelId(index, id)}
      hidden={!selected}
      {...rest}
    >
      {children}
    </div>
  );
}

// export
// ----------------------------------------

export {
  TabsProvider,
  type TabsProviderProps,
  TabList,
  type TabListProps,
  Tab,
  type TabProps,
  PanelList,
  type PanelListProps,
  Panel,
  type PanelProps,
};
