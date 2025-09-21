import { isWithinInterval, subMonths } from "date-fns";
import { type Metadata } from "next";
import { BsArrowUpRight } from "react-icons/bs";

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
      <Container>
        <section>
          <div className="text-center">
            <Heading1>{routes.blog.label}</Heading1>
          </div>

          <ul className="mt-10 space-y-4">
            {zennArticles.map((zennArticle) => {
              if (!zennArticle.isoDate) return null;

              return (
                <li key={zennArticle.guid}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={zennArticle.link}
                    className={cn(
                      "group border-base-light-300 block rounded-sm border px-5 py-4 transition-colors ease-out",
                      "hover:bg-base-light-50 hover:border-base-foreground",
                      "active:bg-base-light-50 active:border-base-foreground",
                    )}
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="text-xl font-bold">
                        {zennArticle.title}
                      </div>
                      <BsArrowUpRight />
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:mt-4 md:flex-row md:items-center md:gap-4">
                      <div className="flex gap-2">
                        <Tag className="bg-[#ecf5ff] group-hover:bg-[#cce3ff] group-active:bg-[#cce3ff]">
                          Zenn
                        </Tag>
                        {isWithinOneMonth(zennArticle.isoDate) && (
                          <Tag className="bg-danger-600 group-hover:bg-danger-700 group-active:bg-danger-700 font-bold text-white">
                            1ヶ月以内に投稿
                          </Tag>
                        )}
                      </div>
                      <p className="text-base-foreground-weak text-sm">
                        {dateFormat(
                          "yyyy年MM月dd日 HH:mm",
                          zennArticle.isoDate,
                        )}
                      </p>
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
