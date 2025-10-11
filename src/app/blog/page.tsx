import { ExternalLink } from "lucide-react";
import { type Metadata } from "next";

import { getZennArticles } from "@/api/endpoints/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { dateFormat, isWithinOneMonth } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { ContactLinkBanner } from "@/features/contact-link-banner";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export const metadata: Metadata = {
  title: `${routes.blog.label} | ${SITE_TITLE}`,
};

export default async function Page() {
  const zennArticles = await getZennArticles();

  return (
    <div className="flex flex-col gap-20 pb-28">
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <section className="flex flex-col gap-10">
            <div className="text-center">
              <Heading1>{routes.blog.label}</Heading1>
            </div>

            <ul className="flex flex-col gap-10">
              {zennArticles.map((zennArticle) => {
                if (!zennArticle.isoDate) return null;

                return (
                  <li
                    className="flex flex-col gap-4 border-b border-b-stone-300 pb-6"
                    key={zennArticle.guid}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={zennArticle.link}
                      className="group"
                    >
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
                        <div className="text-xl font-bold">
                          {zennArticle.title}
                        </div>
                        <ExternalLink className="mt-1 shrink-0" />
                      </div>
                    </a>

                    <div className="flex gap-2">
                      <Tag variant="zenn">Zenn</Tag>
                      {isWithinOneMonth(zennArticle.isoDate) && (
                        <Tag variant="withinOneMonth">1ヶ月以内に投稿</Tag>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </Container>
      </div>
      <ContactLinkBanner />
    </div>
  );
}
