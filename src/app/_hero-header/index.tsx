import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { routes } from "@/routes";
import { cx } from "@/utils/styling";

const eyeCatchClassName =
  "flex items-center text-5xl sm:text-6xl md:text-8xl lg:text-[7rem]";

export function HeroHeader() {
  return (
    <Container className="flex flex-col gap-12">
      <div className="flex flex-col gap-2 pt-14 sm:pt-20 lg:pb-8">
        <div
          className={cx(
            eyeCatchClassName,
            "text-brand-base font-bold tracking-tight uppercase",
            "flex items-center gap-2 lg:gap-4",
          )}
        >
          <div>Design</div>
          <X className="text-foreground-primary lg:hidden" size={20} />
          <X className="text-foreground-primary hidden lg:block" size={40} />
        </div>
        <div
          className={cx(
            eyeCatchClassName,
            "text-foreground-primary font-mono tracking-[-0.07em]",
          )}
        >
          development
        </div>
      </div>

      <p className="lg:max-w-[90%] lg:text-lg">
        様々な案件のWebアプリケーションやWebサイトのプロジェクトに参画し、主にフロントエンド開発とUIデザインを担当してきました。ユーザーファーストかつ保守性に優れた体験を提供できるよう心掛けています。
      </p>

      <div>
        <Button
          as={Link}
          size="lg"
          href={routes.experience.href}
          className={cx(
            "flex items-center",
            "group lg:inline-flex lg:items-center lg:px-6 lg:text-lg",
          )}
        >
          <span>職務経歴を見る</span>
          <span
            className={cx(
              "ml-1 inline-block lg:ml-1.5",
              "lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none",
            )}
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </span>
        </Button>
      </div>
    </Container>
  );
}
