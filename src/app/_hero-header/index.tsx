"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function HeroHeader() {
  return (
    <div className="pt-10 pb-12">
      <Container>
        <h1 className="text-2xl leading-[1.35] font-bold lg:text-4xl">
          ユーザーフレンドリーで堅牢なWebを開発します。
        </h1>
        <div className="mt-3.5">
          <p className="text-foreground-secondary lg:text-lg">
            新卒でシステム開発企業に入社し、主にWebアプリ開発のフロントエンドを担当してきました。マークアップ技術とReactを利用して、ストレス無く快適に閲覧や操作を行える体験を提供できるよう心掛けています。
          </p>
        </div>

        <Button
          as={Link}
          size="lg"
          href={routes.experience.href}
          className={cn(
            "mt-8 flex items-center",
            "group lg:inline-flex lg:items-center lg:px-6 lg:text-lg",
          )}
        >
          <span>職務経歴を見る</span>
          <span
            className={cn(
              "ml-1 inline-block lg:ml-1.5",
              "lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none",
            )}
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </span>
        </Button>
      </Container>
    </div>
  );
}
