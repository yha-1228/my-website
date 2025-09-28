import { Lock } from "lucide-react";
import { type Metadata } from "next";
import { type ReactNode } from "react";

import { getPortfolioContents } from "@/api/endpoints/portfolio-content";
import { getPortfolioIntroduction } from "@/api/endpoints/portfolio-introduction";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { IDS, SITE_TITLE } from "@/constants";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

interface SectionBoxProps {
  titleElem: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

function SectionBox({
  titleElem,
  children,
  className,
  contentClassName,
}: SectionBoxProps) {
  return (
    <section className={cn("flex flex-col gap-10", className)}>
      {titleElem}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}

function IntroductionDlList({
  className,
  rows,
}: {
  className?: string;
  rows: Array<{ header: string; data: ReactNode }>;
}) {
  return (
    <div
      className={cn(
        "border-b border-b-stone-300 py-8 first:border-t first:border-t-stone-300",
        "flex flex-col gap-8",
        className,
      )}
    >
      {rows.map((row, index) => (
        <dl key={index} className="flex flex-col gap-4 lg:flex-row lg:gap-0">
          <dt className="shrink-0 text-left text-xl leading-[1.3] font-bold whitespace-nowrap lg:w-[196px]">
            {row.header}
          </dt>
          <dd className="max-w-[--breakpoint-md] align-top leading-[1.6]">
            {row.data}
          </dd>
        </dl>
      ))}
    </div>
  );
}

const introductionTagClassName =
  "rounded-sm border bg-white border-[black]/30 px-1.5 text-sm";

export const metadata: Metadata = {
  title: `${routes.portfolio.label} | ${SITE_TITLE}`,
};

export default async function Page() {
  const [portfolioIntroduction, { contents: portfolioContents }] =
    await Promise.all([getPortfolioIntroduction(), getPortfolioContents()]);

  return (
    <>
      <Container className="mt-8">
        <p className="text-foreground-secondary">
          デザイン経験のポートフォリオです。
          <br />
          エンジニア経験については別のページをご覧ください。
        </p>
      </Container>

      <div className="py-14">
        <Container className="flex flex-col gap-16">
          <SectionBox titleElem={<Heading1>概要</Heading1>}>
            <IntroductionDlList
              rows={[
                {
                  header: "対応領域",
                  data: (
                    <div className="flex flex-wrap gap-2">
                      {portfolioIntroduction.scope.split(", ").map((text) => (
                        <span key={text} className={introductionTagClassName}>
                          {text}
                        </span>
                      ))}
                    </div>
                  ),
                },
                {
                  header: "使用言語 / FW",
                  data: (
                    <div className="flex flex-wrap gap-2">
                      {portfolioIntroduction.langAndFws
                        .split(", ")
                        .map((text) => (
                          <span key={text} className={introductionTagClassName}>
                            {text}
                          </span>
                        ))}
                    </div>
                  ),
                },
                {
                  header: "使用ツール",
                  data: (
                    <div className="flex flex-wrap gap-2">
                      {portfolioIntroduction.tools.split(", ").map((text) => (
                        <span key={text} className={introductionTagClassName}>
                          {text}
                        </span>
                      ))}
                    </div>
                  ),
                },
              ]}
            />

            <IntroductionDlList
              rows={[
                {
                  header: "職務経歴",
                  data: (
                    <HtmlRenderer html={portfolioIntroduction.experience} />
                  ),
                },
              ]}
            />

            <IntroductionDlList
              rows={[
                {
                  header: "自己紹介",
                  data: <HtmlRenderer html={portfolioIntroduction.overview} />,
                },
              ]}
            />

            <IntroductionDlList
              rows={[
                {
                  header: "強み",
                  data: <HtmlRenderer html={portfolioIntroduction.tsuyomi} />,
                },
              ]}
            />

            <IntroductionDlList
              rows={[
                {
                  header: "今後の意向",
                  data: <HtmlRenderer html={portfolioIntroduction.kongo} />,
                },
              ]}
            />
          </SectionBox>

          <SectionBox
            titleElem={
              <Heading1 id={IDS["portfolio-projects-heading"]}>
                <a
                  className="underline-offset-8 hover:underline hover:decoration-2 active:underline"
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
                    <a
                      href={routes["portfolio/[id]"].href(content.id)}
                      className={cn(
                        "group flex flex-col gap-3 rounded-sm border border-stone-300 px-5 py-4 transition-colors ease-out",
                        "hover:border-foreground-primary hover:bg-stone-50",
                        "active:border-foreground-primary active:bg-stone-50",
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Lock size={20} className="shrink-0" />
                          <div className="text-xl font-bold">
                            {content.title}
                          </div>
                        </div>
                        {content.subTitle && (
                          <div className="text-foreground-secondary text-xs">
                            {content.subTitle}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                            手法:{" "}
                            {methodTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                            案件:{" "}
                            {projectTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                            UX階層:{" "}
                            {uxLayerTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                            参画:{" "}
                            {assignTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                            稼働:{" "}
                            {jobTypeTags.map((tag) => tag.label).join(" / ")}
                          </Tag>
                        </div>
                        <div className="text-foreground-secondary text-sm">
                          {content.start} - {content.end}
                        </div>
                      </div>
                    </a>
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
