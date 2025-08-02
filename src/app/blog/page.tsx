import { type Metadata } from "next";
import { BsArrowUpRight } from "react-icons/bs";
import Parser from "rss-parser";

import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { dateFormat } from "@/features/blog/date";
import { Tag } from "@/features/blog/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

const parser = new Parser();

async function getZennArticles() {
  const url = "https://zenn.dev/yhase_rqp/feed?all=1";
  const feed = await parser.parseURL(url);
  return feed.items;
}

export const metadata: Metadata = {
  title: routes.blog.label,
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
                    <div className="mt-3 flex items-center space-x-3 sm:mt-4">
                      <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                        Tech
                      </Tag>
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
