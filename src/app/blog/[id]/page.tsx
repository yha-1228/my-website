import { type Metadata } from "next";
import { BsChevronLeft } from "react-icons/bs";

import { getBlogDetail, getBlogList } from "@/api/clients/blog";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Tag } from "@/components/ui/styled/tag";
import { TextLink } from "@/components/ui/styled/text-link";
import { routes } from "@/routes";
import { cn } from "@/utils/css/cn";
import { dateFormat } from "@/utils/date/formatter";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blogDetail = await getBlogDetail(id);

  return {
    title: blogDetail.title,
  };
}

export async function generateStaticParams() {
  const { contents } = await getBlogList();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const blogDetail = await getBlogDetail(id);

  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <TextLink
          href={routes.blog.href}
          className="inline-flex items-center space-x-1"
        >
          <BsChevronLeft />
          <span>戻る</span>
        </TextLink>

        <article className="mt-8">
          <header>
            <Heading1>{blogDetail.title}</Heading1>
            <p className="text-base-foreground-weak mt-4 text-sm font-normal">
              {dateFormat("yyyy/MM/dd HH:mm:ss", blogDetail.publishedAt)} に投稿
            </p>
          </header>
          <div className="border-t-base-light-300 mt-8 border-t border-solid py-5 md:py-6">
            <Tag>{blogDetail.tag.tagName}</Tag>
            <div
              className={cn(
                "pt-4",
                "[&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-2xl [&>h2]:leading-tight [&>h2]:font-bold",
                "[&>p]:my-5",
                "[&>ul]:pl-9",
                "[&>ul>li]:list-disc",
                "[&>hr]:text-base-light-200 [&>hr]:my-6 [&>hr]:border-y-2",
              )}
              dangerouslySetInnerHTML={{
                __html: blogDetail.body,
              }}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
