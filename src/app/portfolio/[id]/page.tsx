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
import { IDS, SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/basic-auth/logout-banner";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blogDetail = await getPortfolioContent(id);

  return {
    title: `${blogDetail?.title} | ${SITE_TITLE}`,
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
    <>
      <LogoutBanner />
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <TextLink
            href={`${routes.portfolio.href}#${IDS["portfolio-projects-heading"]}`}
            className="inline-flex items-center space-x-1"
          >
            <BsChevronLeft />
            <span>案件一覧</span>
          </TextLink>

          <article className="mt-8">
            <header>
              <Heading1>{content.title}</Heading1>
              <p className="text-base-foreground-weak mt-4 text-sm font-normal">
                {content.start} - {content.end}
              </p>
            </header>
            <div className="border-t-base-light-300 mt-8 border-t border-solid py-5 md:py-6">
              <div className="flex flex-wrap gap-1.5">
                {content.tags.map((tag) => (
                  <Tag key={tag.id}>{tag.label}</Tag>
                ))}
              </div>
              <HtmlRenderer html={content.body} className="mt-10" />
            </div>
          </article>
        </Container>
      </div>
    </>
  );
}
