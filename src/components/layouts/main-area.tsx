"use client";

import {
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsArrowUpShort } from "react-icons/bs";

import { Button } from "@/components/ui/styled/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { clientOnly } from "@/lib/next/helpers";
import { cn } from "@/utils/css/cn";
import { getCSSVar } from "@/utils/css/get-css-var";
import { remToPx } from "@/utils/css/unit";
import { sleep } from "@/utils/sleep";

import { SafetyPortal } from "../ui/unstyled/safety-portal";

function useScrollToTopButton() {
  const refToIntersect = useRef<HTMLDivElement | null>(null);
  const [notInView, setNotInView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClickedTiming, setIsClickedTiming] = useState(false);

  useIntersectionObserver(
    refToIntersect,
    (entries) => {
      for (const entry of entries) {
        setNotInView(!entry.isIntersecting);
      }
    },
    {
      rootMargin: `-${remToPx(clientOnly(getCSSVar, "", "--height-header"), true)}`,
    },
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.currentTarget.blur();
    setIsClickedTiming(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    await sleep(100);
    setIsClickedTiming(false);
  };

  useEffect(() => {
    if (!isClickedTiming) {
      setVisible(notInView);
    }
  }, [isClickedTiming, notInView]);

  return { refToIntersect, visible, handleClick };
}

// ----------------------------------------

export function MainArea({ children }: { children: ReactNode }) {
  const scrollToTopButton = useScrollToTopButton();

  return (
    <>
      <main className="relative">
        {/* メインエリアの15%を通過したら上スクロールボタンを表示する */}
        {/* 以下はメインエリアの15%を計測するための要素 ※非表示 */}
        <div
          ref={scrollToTopButton.refToIntersect}
          className="z-hide absolute top-0 h-[calc(calc(100svh-(var(--height-header)))*0.15)] w-full"
          // デバッグのとき: 下記を有効にする
          // style={{ backgroundColor: "rgb(0,0,0,0.1)" }}
        />
        {children}
      </main>

      <SafetyPortal>
        <Button
          type="button"
          variant="outline"
          onClick={scrollToTopButton.handleClick}
          aria-label="トップに戻る"
          data-hidden={scrollToTopButton.visible ? undefined : "true"}
          className={cn(
            "fixed right-6 bottom-5 size-14! rounded-full p-0 text-3xl shadow-lg md:bottom-9",
            "[transition:opacity_200ms,background-color_200ms,translate_200ms]",
            "data-[hidden='true']:pointer-events-none data-[hidden='true']:opacity-0",
            "hover:-translate-y-1",
          )}
        >
          <BsArrowUpShort aria-hidden="true" />
        </Button>
      </SafetyPortal>
    </>
  );
}
