import { ChevronRight, ExternalLink } from "lucide-react";

import { getArticles } from "@/api/endpoints/blog";
import { ScrollbarHiddenIfTouchDevice } from "@/components/ui/headless/scrollbar-hidden-if-touch-device";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLinkNext } from "@/components/ui/styled/text-link-next";
import { dateFormat } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { cx } from "@/utils/styling";

const LIMIT = 3;

export async function Blog() {
  const articles = (await getArticles()).filter((_, i) => i <= LIMIT - 1);

  return (
    <Container>
      <section className="flex flex-col gap-10 border-t pt-8">
        <div className="flex items-center justify-between">
          <Heading1>ブログ</Heading1>
          <TextLinkNext
            href="/blog"
            className="inline-flex items-center gap-1"
          >
            <span>もっと見る</span>
            <ChevronRight />
          </TextLinkNext>
        </div>
        <ScrollbarHiddenIfTouchDevice
          className={cx(
            "flex gap-4 overflow-x-auto",
            "-mx-(--screen-margin) px-(--screen-margin) sm:mx-0 sm:px-0",
            "lg:grid lg:grid-cols-3",
          )}
        >
          {articles.map((article) => (
            <a
              key={article.guid}
              target="_blank"
              rel="noopener noreferrer"
              href={article.link}
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
                    {article.title}
                  </div>
                  <ExternalLink className="mt-1 shrink-0" />
                </div>
                <p className="text-foreground-secondary text-sm">
                  {dateFormat("yyyy年MM月dd日 HH:mm", article.isoDate, {
                    isServer: true,
                  })}
                </p>
              </div>

              <div>
                <Tag variant={article.type} />
              </div>
            </a>
          ))}
        </ScrollbarHiddenIfTouchDevice>
      </section>
    </Container>
  );
}
