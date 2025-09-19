import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

import {
  getPortfolioContent,
  getPortfolioContents,
} from "@/api/endpoints/portfolio-content";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { dateFormat } from "@/features/portfolio/date";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blogDetail = await getPortfolioContent(id);

  return {
    title: blogDetail?.title,
  };
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const { contents } = await getPortfolioContents();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const content = await getPortfolioContent(id);

  if (!content) {
    notFound();
  }

  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <TextLink
          href={routes.portfolio.href}
          className="inline-flex items-center space-x-1"
        >
          <BsChevronLeft />
          <span>ポートフォリオ</span>
        </TextLink>

        <article className="mt-8">
          <header>
            <Heading1>{content.title}</Heading1>
            <p className="text-base-foreground-weak mt-4 text-sm font-normal">
              {dateFormat("yyyy年MM月dd日 HH:mm", content.publishedAt)} に投稿
            </p>
          </header>
          <div className="border-t-base-light-300 mt-8 border-t border-solid py-5 md:py-6">
            <Tag>タグが入ります</Tag>
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
                __html: content.body,
              }}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
