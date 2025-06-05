import { type Metadata } from "next";
import Link from "next/link";

import { getBlogList } from "@/api/clients/microcms";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Tag } from "@/components/ui/styled/tag";
import { routes } from "@/routes";
import { dateFormat } from "@/utils/date";
import { cn } from "@/utils/styling";

export const metadata: Metadata = {
  title: routes.blog.label,
};

export default async function Page() {
  const { contents } = await getBlogList();

  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="text-center">
            <Heading1>{routes.blog.label}</Heading1>
          </div>
          <ul className="mt-10 space-y-4">
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes.blog.routes[":id"].href(content.id)}
                  className={cn(
                    "group border-base-light-300 block rounded-sm border px-5 py-4 ease-out",
                    "hover:bg-base-light-50 hover:border-base-foreground",
                  )}
                >
                  <div className="text-xl font-bold">{content.title}</div>
                  <div className="mt-3 flex items-center space-x-3 sm:mt-4">
                    <Tag className="group-hover:border-base-light-300 border border-transparent">
                      {content.tag.tagName}
                    </Tag>
                    <p className="text-base-foreground-weak text-sm">
                      {dateFormat("yyyy年MM月dd日 HH:mm", content.publishedAt)}
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
