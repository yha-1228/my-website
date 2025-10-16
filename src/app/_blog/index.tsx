import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { getZennArticles } from "@/api/endpoints/blog";
import { ScrollbarHiddenIfTouchDevice } from "@/components/ui/headless/scrollbar-hidden-if-touch-device";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { dateFormat, isWithinOneMonth } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { routes } from "@/routes";
import { cx } from "@/utils/styling";

const LIMIT = 3;

export async function Blog() {
  const zennArticles = (await getZennArticles()).filter(
    (_, i) => i <= LIMIT - 1,
  );

  return (
    <Container>
      <section className="flex flex-col gap-10 border-t pt-8">
        <div className="flex items-center justify-between">
          <Heading1>{routes.blog.label}</Heading1>
          <TextLink
            as={Link}
            href={routes.blog.href}
            className="inline-flex items-center gap-1"
          >
            <span>もっと見る</span>
            <ChevronRight />
          </TextLink>
        </div>
        <ScrollbarHiddenIfTouchDevice
          className={cx(
            "flex gap-4 overflow-x-auto",
            "-mx-(--screen-margin) px-(--screen-margin) sm:mx-0 sm:px-0",
            "lg:grid lg:grid-cols-3",
          )}
        >
          {zennArticles.map((zennArticle) => (
            <a
              key={zennArticle.guid}
              target="_blank"
              rel="noopener noreferrer"
              href={zennArticle.link}
              className={cx(
                "rounded-sm border border-stone-300 bg-white px-5 py-4 transition-colors ease-out",
                "flex flex-col justify-between gap-6 lg:gap-10",
                "w-64 shrink-0 lg:w-auto",
                "hover:border-foreground-primary hover:bg-stone-50",
                "active:border-foreground-primary active:bg-stone-50",
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-x-1.5">
                  <div className="text-lg leading-[1.5] font-bold">
                    {zennArticle.title}
                  </div>
                  <ExternalLink className="mt-1 shrink-0" />
                </div>
                <p className="text-foreground-secondary text-sm">
                  {dateFormat("yyyy年MM月dd日 HH:mm", zennArticle.isoDate)}
                </p>
              </div>

              <div className="flex gap-2">
                <Tag variant="zenn">Zenn</Tag>
                {isWithinOneMonth(zennArticle.isoDate) && (
                  <Tag variant="withinOneMonth">1ヶ月以内に投稿</Tag>
                )}
              </div>
            </a>
          ))}
        </ScrollbarHiddenIfTouchDevice>
      </section>
    </Container>
  );
}
