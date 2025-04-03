"use client";

import { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { BsArrowUpShort } from "react-icons/bs";
import { headerHeight } from "@/components/layouts/header";
import { Button, ButtonLink } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { routes } from "@/routes";
import { cn } from "@/utils/css/cn";
import { remToPx } from "@/utils/css/unit";

export function HeroHeader() {
  const [scrollToTopButtonVisible, setScrollToTopButtonVisible] =
    useState(false);

  const ref = useIntersectionObserver<HTMLDivElement>(
    (entries) => {
      setScrollToTopButtonVisible(!entries[0].isIntersecting);
    },
    { rootMargin: `-${remToPx(headerHeight)}px` },
  );

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="pb-12 pt-10" ref={ref}>
        <Container>
          <h1 className="text-2xl font-bold leading-[1.35] lg:text-4xl">
            ユーザーフレンドリーで堅牢なWebを開発します。
          </h1>
          <div className="mt-3.5">
            <p className="text-base-foreground-weak lg:text-lg">
              新卒でシステム開発企業に入社し、主にWebアプリ開発のフロントエンドを担当してきました。マークアップ技術とReactを利用して、ストレス無く快適に閲覧や操作を行える体験を提供できるよう心掛けています。
            </p>
          </div>

          <ButtonLink
            href={routes.experience.href}
            className="group mt-8 flex items-center lg:inline-flex lg:items-center lg:px-6 lg:py-2 lg:text-lg"
          >
            <span>職務経歴を見る</span>
            <span className="ml-1 inline-block lg:ml-1.5 lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none">
              <Image
                src="/assets/arrow-right-white.svg"
                alt=""
                width={16}
                height={16}
              />
            </span>
          </ButtonLink>
        </Container>
      </div>
      {createPortal(
        <Button
          type="button"
          onClick={handleScrollToTopClick}
          aria-label="トップに戻る"
          className={cn(
            "!size-14 fixed bottom-5 md:bottom-9 text-3xl w-11 right-6 rounded-full p-0 [transition:opacity_200ms,background-color_200ms,transform_200ms] disabled:bg-primary-600 disabled:opacity-0 disabled:cursor-default hidden md:inline-flex hover:-translate-y-1",
          )}
          disabled={!scrollToTopButtonVisible}
        >
          <BsArrowUpShort aria-hidden="true" />
        </Button>,
        document.body,
      )}
    </>
  );
}
