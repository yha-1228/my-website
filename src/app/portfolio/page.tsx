import { type Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

import { getPortfolioContents } from "@/api/endpoints/portfolio-content";
import {
  getPortfolioIntroduction,
  getPortfolioIntroductionLeft,
} from "@/api/endpoints/portfolio-introduction";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { IDS, SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/basic-auth/logout-banner";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

interface SectionBoxProps {
  titleElem: ReactNode;
  children: ReactNode;
  className?: string;
}

function SectionBox({ titleElem, children, className }: SectionBoxProps) {
  return (
    <section className={cn("flex flex-col gap-10", className)}>
      {titleElem}
      <div>{children}</div>
    </section>
  );
}

export const metadata: Metadata = {
  title: `${routes.portfolio.label} | ${SITE_TITLE}`,
};

export default async function Page() {
  const [
    portfolioIntroductionLeft,
    portfolioIntroduction,
    { contents: portfolioContents },
  ] = await Promise.all([
    getPortfolioIntroductionLeft(),
    getPortfolioIntroduction(),
    getPortfolioContents(),
  ]);

  return (
    <>
      <LogoutBanner />
      <div className="py-14">
        <Container className="flex flex-col gap-14">
          <SectionBox titleElem={<Heading1>自己紹介</Heading1>}>
            <div className="border-base-light-300 text-base-foreground-weak mb-4 rounded-sm border px-4 py-2 text-sm">
              申し訳ございませんが、スマートフォンでは表示が崩れるためPCまたはタブレットでの閲覧を推奨します。
            </div>
            <div className="border-base-light-300 rounded-[4px] border">
              <HtmlRenderer
                className="bg-base-light-100 rounded-[3px] px-8"
                html={portfolioIntroductionLeft.body}
              />
              <HtmlRenderer className="p-8" html={portfolioIntroduction.body} />
            </div>
          </SectionBox>

          <SectionBox
            titleElem={
              <Heading1 id={IDS["portfolio-projects-heading"]}>
                <a
                  className="underline-offset-8 hover:underline hover:decoration-2"
                  href={`#${IDS["portfolio-projects-heading"]}`}
                >
                  実績一覧
                </a>
              </Heading1>
            }
          >
            <ul className="flex flex-col gap-4">
              {portfolioContents.map((content) => {
                const {
                  methodTags,
                  projectTags,
                  uxLayerTags,
                  assignTags,
                  jobTypeTags,
                } = groupTags(content.tags);

                return (
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
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                            手法:{" "}
                            {methodTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                            案件:{" "}
                            {projectTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                            UX階層:{" "}
                            {uxLayerTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                            参画:{" "}
                            {assignTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="group-hover:border-base-light-300 group-active:border-base-light-300 border border-transparent">
                            稼働:{" "}
                            {jobTypeTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                        </div>
                        {content.isDraft && (
                          <div className="text-danger-600 text-sm font-bold">
                            掲載許可確認中
                          </div>
                        )}
                        <div className="text-base-foreground-weak text-sm">
                          {content.start} - {content.end}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SectionBox>
        </Container>
      </div>
    </>
  );
}
