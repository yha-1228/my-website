import Link from "next/link";

import { getPortfolioContents } from "@/api/endpoints/portfolio-content";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { dateFormat } from "@/features/portfolio/date";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export default async function Page() {
  const { contents } = await getPortfolioContents();

  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="text-center">
            <Heading1>{routes.portfolio.label}</Heading1>
          </div>

          <ul className="mt-10 space-y-4">
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes["portfolio/[id]"].href(content.id)}
                  className={cn(
                    "group border-base-light-300 flex flex-col gap-3 rounded-sm border px-5 py-4 transition-colors ease-out",
                    "hover:bg-base-light-50 hover:border-base-foreground",
                    "active:bg-base-light-50 active:border-base-foreground",
                  )}
                >
                  <div className="text-xl font-bold">{content.title}</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {content.tags.map((tag) => (
                        <Tag
                          className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent"
                          key={tag.id}
                        >
                          {tag.label}
                        </Tag>
                      ))}
                    </div>

                    <p className="text-base-foreground-weak text-sm">
                      投稿:{" "}
                      {dateFormat("yyyy年MM月dd日 HH:mm", content.createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
