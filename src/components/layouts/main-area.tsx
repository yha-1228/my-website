"use client";

import { type ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsArrowUpShort } from "react-icons/bs";
import { Button } from "@/components/ui/styled/button";
import { TOP_LOGO_ID } from "@/constants";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/utils/css/cn";

function useScrollToTopButton() {
  const refToIntersect = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useIntersectionObserver(refToIntersect, (entries) => {
    for (const entry of entries) {
      setVisible(!entry.isIntersecting);
    }
  });

  const handleClick = () => {
    window.scrollTo({ top: 0 });
    document.getElementById(TOP_LOGO_ID)?.focus();
  };

  return { refToIntersect, visible, handleClick };
}

// ----------------------------------------

export function MainArea({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const scrollToTopButton = useScrollToTopButton();

  return (
    <>
      <main className="relative">
        {/* メインエリアの15%を通過したら上スクロールボタンを表示する */}
        {/* 以下はメインエリアの15%を計測するための要素 ※非表示 */}
        <div
          ref={scrollToTopButton.refToIntersect}
          className="absolute left-0 top-0 z-hide h-[calc(calc(100svh-theme(height.header))*0.15)] w-full"
          // デバッグのとき: 下記を有効にする
          // style={{ backgroundColor: "rgb(0,0,0,0.1)" }}
        />
        {children}
      </main>

      {isClient &&
        createPortal(
          <Button
            type="button"
            variant="outline"
            onClick={scrollToTopButton.handleClick}
            aria-label="トップに戻る"
            data-hidden={scrollToTopButton.visible ? undefined : "true"}
            className={cn(
              "shadow-lg !size-14 fixed bottom-5 md:bottom-9 text-3xl right-6 rounded-full p-0",
              "[transition:opacity_200ms,background-color_200ms,transform_200ms]",
              "data-[hidden='true']:opacity-0 data-[hidden='true']:pointer-events-none",
              "hover:-translate-y-1",
            )}
          >
            <BsArrowUpShort aria-hidden="true" />
          </Button>,
          document.body,
        )}
    </>
  );
}
