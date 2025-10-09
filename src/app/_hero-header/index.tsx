"use client";

import { ArrowRight, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function HeroHeader() {
  return (
    <div className="pt-10 sm:pt-14">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div
            className={cn(
              "border-brand-active border-2 border-dashed p-4 lg:p-5",
              "text-brand-active flex items-center justify-center text-6xl font-bold tracking-tight sm:justify-start sm:text-5xl md:text-6xl lg:text-8xl",
            )}
          >
            Design
          </div>
          <div
            className={cn(
              "lg:hidden",
              "text-foreground-placeholder rotate-90 self-center",
            )}
          >
            <ArrowRightLeft size={20} />
          </div>
          <div
            className={cn(
              "hidden lg:block",
              "text-foreground-placeholder self-center",
            )}
          >
            <ArrowRightLeft size={30} />
          </div>

          <div
            className={cn(
              "border-l-4 border-stone-300 bg-stone-100 p-4 lg:p-5",
              "flex items-center justify-center font-mono text-4xl tracking-[-0.09em] text-[black]/80 sm:justify-start sm:text-5xl md:text-6xl lg:text-8xl",
            )}
          >
            development
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="lg:text-lg">
            様々な案件のWebアプリケーションやWebサイトのプロジェクトに参画し、主にフロントエンド開発とUIデザインを担当してきました。ユーザーファーストかつ保守性に優れた体験を提供できるよう心掛けています。
          </p>
        </div>

        <div>
          <Button
            as={Link}
            size="lg"
            href={routes.experience.href}
            className={cn(
              "flex items-center",
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
        </div>
      </Container>
    </div>
  );
}
