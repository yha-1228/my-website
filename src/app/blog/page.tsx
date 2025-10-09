import { isWithinInterval, subMonths } from "date-fns";
import { ExternalLink } from "lucide-react";
import { type Metadata } from "next";

import { getZennArticles } from "@/api/endpoints/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { dateFormat } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

/**
 * `targetDateISO`が`baseDate`から一ヶ月以内かどうか判定する。
 */
function isWithinOneMonth(targetDateISO: string, baseDate = new Date()) {
  const targetDate = new Date(targetDateISO);

  return isWithinInterval(targetDate, {
    start: subMonths(baseDate, 1),
    end: baseDate,
  });
}

export const metadata: Metadata = {
  title: `${routes.blog.label} | ${SITE_TITLE}`,
};

export default async function Page() {
  const zennArticles = await getZennArticles();

  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="text-center">
            <Heading1>{routes.blog.label}</Heading1>
          </div>

          <ul className="mt-10 flex flex-col gap-10">
            {zennArticles.map((zennArticle) => {
              if (!zennArticle.isoDate) return null;

              return (
                <li key={zennArticle.guid}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={zennArticle.link}
                    className={cn(
                      "group flex flex-col gap-4 border-b border-b-stone-300 pb-6 transition-colors ease-out",
                    )}
                  >
                    <div>
                      <p className="text-foreground-secondary text-sm">
                        {dateFormat(
                          "yyyy年MM月dd日 HH:mm",
                          zennArticle.isoDate,
                        )}
                      </p>
                      <div
                        className={cn(
                          "flex items-start gap-x-2",
                          "group-hover:text-brand-base group-active:text-brand-base",
                        )}
                      >
                        <div className={cn("text-xl font-bold")}>
                          {zennArticle.title}
                        </div>
                        <ExternalLink className="mt-1 shrink-0" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Tag variant="zenn" className="transition-colors">
                        Zenn
                      </Tag>
                      {isWithinOneMonth(zennArticle.isoDate) && (
                        <Tag variant="withinOneMonth">1ヶ月以内に投稿</Tag>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </div>
  );
}
