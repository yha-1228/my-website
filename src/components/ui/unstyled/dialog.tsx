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

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

interface UseDialogProps {
  /**
   * @default false
   */
  initialOpen?: boolean;
  /**
   * @default true
   */
  closeOnEscKeyDown?: boolean;
}

function useDialog(props: UseDialogProps) {
  const { initialOpen = false, closeOnEscKeyDown = true } = props;

  const rootId = useId();

  const contentRef = useRef<HTMLDivElement>(null);
  const activeElementOnOpenRef = useRef<Element | null>(null);

  const [open, setOpen] = useState(initialOpen);

  const onCloseDialog = () => {
    setOpen(false);

    if (activeElementOnOpenRef.current instanceof HTMLElement) {
      activeElementOnOpenRef.current.focus();
    }
  };

  useEffect(() => {
    if (open) {
      activeElementOnOpenRef.current = document.activeElement;
      sleep(0).then(() => {
        contentRef.current?.focus();
      });
    }
  }, [open]);

  useScrollLock({
    enabled: open,
  });

  useKeydown((event) => {
    if (open) {
      loopFocus(event, contentRef.current);
    }
  });

  useKeydown((event) => {
    if (open && closeOnEscKeyDown && event.key === "Escape") {
      onCloseDialog();
    }
  });

  return { rootId, contentRef, open, setOpen, onCloseDialog };
}

type UseDialogReturn = ReturnType<typeof useDialog>;

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

    if (!context.open) {
      context.setOpen(true);
    } else {
      context.setOpen(false);
    }
  };

  return (
    <Comp
      type="button"
      aria-controls={createContentId(context.rootId)}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      onClick={handleClick}
      {...restProps}
    />
  );
}

// ---

function DialogPortal({ children }: { children: ReactNode }) {
  const context = useDialogContext();
  return context.open ? <SafetyPortal>{children}</SafetyPortal> : null;
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

  return <div onClick={handleClick} {...restProps} />;
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

  return (
    <div
      id={createContentId(context.rootId)}
      role="dialog"
      aria-labelledby={createTitleId(context.rootId)}
      tabIndex={-1}
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
