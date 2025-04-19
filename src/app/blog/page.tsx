import { type Metadata } from "next";
import Link from "next/link";

import { getBlogList } from "@/api/clients/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Tag } from "@/components/ui/styled/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/css/cn";
import { dateFormat } from "@/utils/date/formatter";

export const metadata: Metadata = {
  title: routes.blog.label,
};

export default async function Page() {
  const { contents } = await getBlogList();

  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="pb-10 text-center">
            <Heading1>{routes.blog.label}</Heading1>
          </div>
          <ul className="space-y-4">
            {contents.map((content) => (
              <li key={content.id}>
                <Link
                  href={routes.blog.routes[":id"].href(content.id)}
                  className={cn(
                    "group border-base-light-300 block rounded-md border border-solid px-5 py-4 transition-colors duration-200 ease-out",
                    "active:outline-primary-600 active:outline-2 active:outline-offset-0",
                    "focus-visible:outline-primary-600 focus-visible:outline-2 focus-visible:outline-offset-0",
                  )}
                >
                  <div className="text-xl font-bold underline-offset-4 group-hover:underline">
                    {content.title}
                  </div>
                  <p className="text-base-foreground-weak text-sm">
                    {dateFormat("yyyy/MM/dd HH:mm:ss", content.publishedAt)}
                    に投稿
                  </p>
                  <Tag className="mt-5">{content.tag.tagName}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
