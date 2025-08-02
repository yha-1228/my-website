import { type ComponentProps, useEffect, useId, useRef, useState } from "react";

import { useKeydown } from "@/hooks/use-keydown";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { sleep } from "@/utils/misc";

function createContentId(rootId: string) {
  return `modal-${rootId}-content` as const;
}

/**
 * モバイルメニューの次を管理するHook。
 *
 * - 開かれたとき、メニューの中身にフォーカスする
 * - Escを押下されたら閉じる
 * - 閉じられたとき、トリガーにフォーカスする
 * - トリガーのa11y
 * - メニューの中身のa11y
 */
function useMobileMenu() {
  const [open, setOpen] = useState(false);

  const rootId = useId();
  const contentId = createContentId(rootId);

  const contentRef = useRef<HTMLDivElement>(null);
  const activeElementOnOpenRef = useRef<Element | null>(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);

    if (activeElementOnOpenRef.current instanceof HTMLElement) {
      activeElementOnOpenRef.current.focus();
    }
  };

  useEffect(() => {
    if (open) {
      activeElementOnOpenRef.current = document.activeElement;
      // HACK: setTimeoutがないとフォーカスがうまくいかない？
      sleep(0).then(() => {
        contentRef.current?.focus();
      });
    }
  }, [open]);

  useScrollLock({
    enabled: open,
  });

  useKeydown((event) => {
    if (open && event.key === "Escape") {
      closeModal();
    }
  });

  const triggerProps = {
    type: "button",
    "aria-controls": contentId,
    "aria-expanded": open,
    onClick: () => {
      if (!open) {
        openModal();
      } else {
        closeModal();
      }
    },
  } as const satisfies Partial<ComponentProps<"button">>;

  const contentProps = {
    id: contentId,
    ref: contentRef,
  } as const satisfies Partial<ComponentProps<"div">>;

  return { open, openModal, closeModal, triggerProps, contentProps };
}

export { useMobileMenu };
