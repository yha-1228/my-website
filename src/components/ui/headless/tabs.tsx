"use client";

import {
  Children,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";

import { getContextAndHook } from "@/utils/react";

// ----------------------------------------

function getTabId(index: number, id: string) {
  return `${id}-tab-${index}` as const;
}

function getPanelId(index: number, id: string) {
  return `${id}-panel-${index}` as const;
}

interface FocusRovingAction {
  onCurrent?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

function focusRoving(
  event: KeyboardEvent<HTMLButtonElement>,
  element: HTMLButtonElement,
  action: FocusRovingAction,
) {
  const { onCurrent, onPrev, onNext, onFirst, onLast } = action;

  const prev = element.previousElementSibling;
  const next = element.nextElementSibling;

  const first = element.parentElement?.firstElementChild;
  const last = element.parentElement?.lastElementChild;

  if (event.key === "ArrowRight") {
    if (next instanceof HTMLButtonElement) {
      onNext?.();
      next.focus();
    } else {
      if (first instanceof HTMLButtonElement) {
        onFirst?.();
        first.focus();
      }
    }
  }

  if (event.key === "ArrowLeft") {
    if (prev instanceof HTMLButtonElement) {
      onPrev?.();
      prev.focus();
    } else {
      if (last instanceof HTMLButtonElement) {
        onLast?.();
        last.focus();
      }
    }
  }

  if (event.key === "Home") {
    if (first instanceof HTMLButtonElement) {
      onFirst?.();
      first?.focus();
    }
  }

  if (event.key === "End") {
    if (last instanceof HTMLButtonElement) {
      onLast?.();
      last.focus();
    }
  }

  if (event.key === "Enter") {
    onCurrent?.();
  }
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

interface TabsProps extends UseTabsProps, ComponentProps<"div"> {}

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
 *       <TabList className="*:aria-selected:font-bold">
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
function Tabs(props: TabsProps) {
  const { defaultIndex, onTabChange, ...rest } = props;
  const value = useTabs({ defaultIndex, onTabChange });

  return (
    <TabsContext value={value}>
      <div {...rest} />
    </TabsContext>
  );
}

// ----------------------------------------

interface TabContextValue {
  index: number;
  lastIndex: number;
}

const [useTabContext, TabContext] = getContextAndHook<TabContextValue>(
  "useTabContext",
  "TabList",
);

type TabListProps = Omit<ComponentProps<"div">, "role" | "aria-orientation">;

function TabList(props: TabListProps) {
  const { children, ...rest } = props;
  const lastTabElementIndex = Children.count(children) - 1;

  return (
    <div role="tablist" aria-orientation="horizontal" {...rest}>
      {Children.map(children, (children, index) => (
        <TabContext
          key={index}
          value={{
            index,
            lastIndex: lastTabElementIndex,
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
  const { index, lastIndex } = useTabContext();

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
    if (!ref.current) return;

    focusRoving(event, ref.current, {
      onCurrent: () => actionTabChange(index),
      onPrev: () => actionTabChange(index - 1),
      onNext: () => actionTabChange(index + 1),
      onFirst: () => actionTabChange(0),
      onLast: () => actionTabChange(lastIndex),
    });
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
  ComponentProps<"div">,
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
  type UseTabsProps,
  Tabs,
  type TabsProps,
  TabList,
  type TabListProps,
  Tab,
  type TabProps,
  PanelList,
  type PanelListProps,
  Panel,
  type PanelProps,
};
