import { X } from "lucide-react";
import { type JSX, type ReactNode, useState } from "react";

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProvider,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/headless/dialog";
import { Button } from "@/components/ui/styled/button";
import { cn } from "@/utils/styling";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncFunction = (...args: any[]) => Promise<any>;

interface UseAsyncFunctionProps<T extends AnyAsyncFunction> {
  fn: T;
  onSuccess?: (result: Awaited<ReturnType<T>>) => void;
  onError?: (error: Error) => void;
}

function useAsyncFunction<T extends AnyAsyncFunction>(
  props: UseAsyncFunctionProps<T>,
) {
  const { fn, onSuccess, onError } = props;

  const [state, setState] = useState({
    isPending: false,
    isSuccess: false,
    isError: false,
  });

  const handleMutate = async (...args: Parameters<T>) => {
    setState((prev) => ({ ...prev, isPending: true }));

    try {
      const result = (await fn(...args)) as Awaited<ReturnType<T>>;
      onSuccess?.(result);
      setState((prev) => ({ ...prev, isSuccess: true, isError: false }));
    } catch (error) {
      onError?.(error as Error);
      setState((prev) => ({ ...prev, isSuccess: false, isError: true }));
    } finally {
      setState((prev) => ({ ...prev, isPending: false }));
    }
  };

  return { ...state, handleMutate };
}

// ----------------------------------------

interface PrimaryButtonProps {
  label: ReactNode;
  onPrimaryAction?: () => void | Promise<void>;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const { label, onPrimaryAction } = props;
  const { onCloseDialog } = useDialogContext();
  const { handleMutate, isPending } = useAsyncFunction({
    fn: async () => {
      await onPrimaryAction?.();
    },
  });

  const handleClick = async () => {
    await handleMutate();
    onCloseDialog();
  };

  return (
    <Button type="button" disabled={isPending} onClick={handleClick}>
      {label}
    </Button>
  );
}

// ----------------------------------------

export interface DialogProps {
  trigger: JSX.Element;
  dialogTitle: ReactNode;
  dialogBody: ReactNode;
  primaryButtonProps: PrimaryButtonProps;
}

export function Dialog(props: DialogProps) {
  const { trigger, dialogTitle, dialogBody, primaryButtonProps } = props;

  return (
    <DialogProvider>
      {trigger}
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "fixed inset-0 z-[10000] bg-[#000]/50",
            // animation
            "fill-mode-forwards",
            "data-[state=enter]:animate-in data-[state=leave]:animate-out",
            "data-[state=leave]:fade-out-0 data-[state=enter]:fade-in-0",
          )}
        />
        <DialogContent
          className={cn(
            "fixed top-[50%] left-[50%] z-[100001] translate-x-[-50%] translate-y-[-50%] sm:top-[10%] sm:translate-y-[0%]",
            "w-full max-w-[calc(100%-calc(var(--screen-margin)*2))] sm:max-w-[560px]",
            "overflow-hidden rounded-lg bg-white",
            "flex flex-col gap-7",
            // animation
            "fill-mode-forwards",
            "data-[state=enter]:animate-in data-[state=leave]:animate-out",
            "data-[state=leave]:fade-out-0 data-[state=enter]:fade-in-0",
            "data-[state=leave]:zoom-out-95 data-[state=enter]:zoom-in-95",
          )}
        >
          <div className="flex items-center justify-between pt-6 pr-6 pl-8">
            <DialogTitle className="text-2xl font-bold">
              {dialogTitle}
            </DialogTitle>
            <DialogClose
              aria-label="閉じる"
              className="rounded-touchable inline-flex size-10 items-center justify-center transition-[opacity,background-color] hover:bg-stone-100 active:bg-stone-100 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X />
            </DialogClose>
          </div>
          <div className="px-8">{dialogBody}</div>
          <div className="flex flex-col-reverse gap-2 border-t border-t-stone-300 bg-stone-50 px-8 py-5 sm:flex-row sm:justify-end">
            <DialogClose as={Button} variant="outline">
              キャンセル
            </DialogClose>
            <PrimaryButton {...primaryButtonProps} />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogProvider>
  );
}
