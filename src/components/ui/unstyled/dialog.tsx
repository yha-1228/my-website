import { hideOthers } from "aria-hidden";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useKeydown } from "@/hooks/use-keydown";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { type ElementTypeOf, type PropsWithAs } from "@/types/react";
import { loopFocus } from "@/utils/loop-focus";
import { sleep } from "@/utils/misc";
import { getContextAndHook } from "@/utils/react";

import { SafetyPortal } from "../headless/safety-portal";

// helpers
// ----------------------------------------

function createContentId(rootId: string) {
  return `${rootId}-dialog__content` as const;
}

function createTitleId(rootId: string) {
  return `${rootId}-dialog__title` as const;
}

// context
// ----------------------------------------

const states = {
  IDLE: "idle",
  ENTER: "enter",
  ENTER_ACTIVE: "enter-active",
  LEAVE: "leave",
  LEAVE_ACTIVE: "leave-active",
} as const;

type State = (typeof states)[keyof typeof states];

interface UseDialogProps {
  /**
   * @default "idle"
   */
  initialState?: State;
  /**
   * @default true
   */
  closeOnEscKeyDown?: boolean;
}

function useDialog(props: UseDialogProps) {
  const { initialState = states.IDLE, closeOnEscKeyDown = true } = props;

  const rootId = useId();

  const contentRef = useRef<HTMLDivElement>(null);
  const activeElementOnOpenRef = useRef<Element | null>(null);

  const [state, setState] = useState<State>(initialState);

  const onCloseDialog = () => {
    setState(states.LEAVE);

    if (activeElementOnOpenRef.current instanceof HTMLElement) {
      activeElementOnOpenRef.current.focus();
    }
  };

  useEffect(() => {
    if (state === states.ENTER_ACTIVE) {
      activeElementOnOpenRef.current = document.activeElement;
      sleep(0).then(() => {
        contentRef.current?.focus();
      });
    }
  }, [state]);

  useScrollLock({
    enabled: state === states.ENTER_ACTIVE,
  });

  useKeydown((event) => {
    if (state === states.ENTER_ACTIVE) {
      loopFocus(event, contentRef.current);
    }
  });

  useKeydown((event) => {
    if (
      state === states.ENTER_ACTIVE &&
      closeOnEscKeyDown &&
      event.key === "Escape"
    ) {
      onCloseDialog();
    }
  });

  return {
    rootId,
    contentRef,
    state,
    setState,
    onCloseDialog,
  };
}

type UseDialogReturn = ReturnType<typeof useDialog>;

function getDataAttr(context: UseDialogReturn) {
  return {
    "data-state": context.state,
  };
}

// ---

const [useDialogContext, DialogContext] = getContextAndHook<UseDialogReturn>(
  "useDialogContext",
  "DialogProvider",
);

// ---

interface DialogProviderProps extends UseDialogProps {
  children: ReactNode;
}

/**
 * @example
 * ```tsx
 * <DialogProvider>
 *  <DialogTrigger>Open</DialogTrigger>
 *  <DialogPortal>
 *    <DialogOverlay className="fixed inset-0 z-[10000] bg-[#000]/70" />
 *    <DialogContent className="fixed left-1/2 top-1/2 z-[100001] -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:w-[400px]">
 *      <DialogTitle className="text-lg font-bold">Title</DialogTitle>
 *      <div className="mt-2">Lorem ipsum dolor sit amet.</div>
 *      <div className="mt-4">
 *        <DialogClose>Close</DialogClose>
 *      </div>
 *    </DialogContent>
 *  </DialogPortal>
 * </DialogProvider>
 * ```
 */
function DialogProvider(props: DialogProviderProps) {
  const { children, ...useDialogProps } = props;
  const value = useDialog(useDialogProps);

  return <DialogContext value={value}>{children}</DialogContext>;
}

// components
// ----------------------------------------

type DialogTriggerProps<TAs extends ElementTypeOf<"button">> = Omit<
  PropsWithAs<TAs, "button">,
  "type" | "aria-controls" | "aria-haspopup" | "aria-expanded"
>;

function DialogTrigger<TAs extends ElementTypeOf<"button">>(
  props: DialogTriggerProps<TAs>,
) {
  const { as: Comp = "button", onClick, ...restProps } = props;
  const context = useDialogContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    context.setState(states.ENTER);
  };

  return (
    <Comp
      type="button"
      aria-controls={createContentId(context.rootId)}
      aria-haspopup="dialog"
      aria-expanded={context.state === states.ENTER_ACTIVE}
      onClick={handleClick}
      {...restProps}
    />
  );
}

// ---

function DialogPortal({ children }: { children: ReactNode }) {
  const context = useDialogContext();

  if (context.state === states.IDLE) return null;

  if (context.state === states.LEAVE_ACTIVE) return null;

  return <SafetyPortal>{children}</SafetyPortal>;
}

// ---

interface DialogOverlayProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * @default true
   */
  closeOnClick?: boolean;
}

function DialogOverlay(props: DialogOverlayProps) {
  const { closeOnClick = true, onClick, ...restProps } = props;
  const context = useDialogContext();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnClick) {
      context.onCloseDialog();
    }
    onClick?.(event);
  };

  useEffect(() => {
    const onAnimationend = () => {
      if (context.state === states.ENTER) {
        context.setState(states.ENTER_ACTIVE);
        return;
      }

      if (context.state === states.LEAVE) {
        context.setState(states.LEAVE_ACTIVE);
        return;
      }
    };

    addEventListener("animationend", onAnimationend);
    return () => removeEventListener("animationend", onAnimationend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state]);

  return <div onClick={handleClick} {...getDataAttr(context)} {...restProps} />;
}

// ---

function DialogTitle(props: Omit<ComponentProps<"h2">, "id">) {
  const context = useDialogContext();

  return <h2 id={createTitleId(context.rootId)} {...props} />;
}

// ---

type DialogCloseProps<TAs extends ElementTypeOf<"button">> = Omit<
  PropsWithAs<TAs, "button">,
  "type"
>;

function DialogClose<TAs extends ElementTypeOf<"button">>(
  props: DialogCloseProps<TAs>,
) {
  const { as: Comp = "button", onClick, ...restProps } = props;
  const context = useDialogContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    context.onCloseDialog();
    onClick?.(event);
  };

  return <Comp type="button" onClick={handleClick} {...restProps} />;
}

// ---

type DialogContentProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "id" | "role" | "aria-labelledby" | "tabIndex"
>;

function DialogContent(props: DialogContentProps) {
  const context = useDialogContext();

  useEffect(() => {
    if (!context.contentRef.current) return;
    const undo = hideOthers(context.contentRef.current);
    return () => undo();
  }, [context.contentRef]);

  useEffect(() => {
    const onAnimationend = () => {
      if (context.state === states.ENTER) {
        context.setState(states.ENTER_ACTIVE);
        return;
      }

      if (context.state === states.LEAVE) {
        context.setState(states.LEAVE_ACTIVE);
        return;
      }
    };

    addEventListener("animationend", onAnimationend);
    return () => removeEventListener("animationend", onAnimationend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state]);

  return (
    <div
      id={createContentId(context.rootId)}
      role="dialog"
      aria-labelledby={createTitleId(context.rootId)}
      tabIndex={-1}
      {...getDataAttr(context)}
      ref={context.contentRef}
      {...props}
    />
  );
}

// exports
// ----------------------------------------

export {
  DialogProvider,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
};
