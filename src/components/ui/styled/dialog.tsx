import { X } from "lucide-react";
import { type JSX, type ReactNode } from "react";

import { Button, type ButtonVariant } from "@/components/ui/styled/button";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProvider,
  DialogTitle,
} from "@/components/ui/unstyled/dialog";
import { cn } from "@/utils/styling";

interface DialogButton {
  content: ReactNode;
  variant: ButtonVariant;
  onClick?: () => void;
}

export interface DialogProps {
  trigger: JSX.Element;
  dialogTitle: ReactNode;
  dialogBody: ReactNode;
  dialogButtons: DialogButton[];
}

export function Dialog(props: DialogProps) {
  const { trigger, dialogTitle, dialogBody, dialogButtons } = props;

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
            {dialogButtons.map((button, i) => (
              <DialogClose
                as={Button}
                key={i}
                variant={button.variant}
                onClick={button.onClick}
              >
                {button.content}
              </DialogClose>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogProvider>
  );
}
