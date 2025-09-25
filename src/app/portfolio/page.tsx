import { type Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

import { getPortfolioContents } from "@/api/endpoints/portfolio-content";
import { getPortfolioIntroduction } from "@/api/endpoints/portfolio-introduction";
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

function IntroductionTable({
  className,
  rows,
}: {
  className?: string;
  rows: Array<{ header: string; data: ReactNode }>;
}) {
  return (
    <table
      className={cn(
        "flex flex-col px-7 py-2",
        "[&_tr]:border-t [&_tr]:first:border-none",
        "[&_td]:py-4 [&_th]:py-4",
        "[&_td]:leading-[1.55]! [&_th]:leading-[1.5]!",
        "[&_th]:w-[240px] [&_th]:text-left [&_th]:align-top [&_th]:text-xl [&_th]:whitespace-nowrap",
        "[&_td]:align-top",
        className,
      )}
    >
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th>{row.header}</th>
            <td>{row.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      <LogoutBanner />
      <div className="py-14">
        <Container className="flex flex-col gap-14">
          <SectionBox
            titleElem={<Heading1>自己紹介</Heading1>}
            contentClassName="flex flex-col gap-4"
          >
            <div className="border-base-light-300 overflow-hidden rounded-md border">
              <IntroductionTable
                className="bg-base-light-100 [&_tr]:border-base-light-300"
                rows={[
                  {
                    header: "対応領域",
                    data: (
                      <div className="flex flex-wrap gap-1.5">
                        {portfolioIntroduction.scope.split(", ").map((text) => (
                          <span key={text} className={introductionTagClassName}>
                            {text}
                          </span>
                        ))}
                      </div>
                    ),
                  },
                  {
                    header: "使用言語・FW",
                    data: (
                      <div className="flex flex-wrap gap-1.5">
                        {portfolioIntroduction.langAndFws
                          .split(", ")
                          .map((text) => (
                            <span
                              key={text}
                              className={introductionTagClassName}
                            >
                              {text}
                            </span>
                          ))}
                      </div>
                    ),
                  },
                  {
                    header: "使用ツール",
                    data: (
                      <div className="flex flex-wrap gap-1.5">
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
              <IntroductionTable
                className="[&_tr]:border-base-light-200"
                rows={[
                  {
                    header: "概要",
                    data: (
                      <HtmlRenderer html={portfolioIntroduction.overview} />
                    ),
                  },
                  {
                    header: "職務経歴",
                    data: (
                      <HtmlRenderer html={portfolioIntroduction.experience} />
                    ),
                  },
                  {
                    header: "大切にしていること",
                    data: (
                      <HtmlRenderer html={portfolioIntroduction.torikumi} />
                    ),
                  },
                  {
                    header: "強み",
                    data: <HtmlRenderer html={portfolioIntroduction.tsuyomi} />,
                  },
                  {
                    header: "今後やりたいこと",
                    data: <HtmlRenderer html={portfolioIntroduction.kongo} />,
                  },
                ]}
              />
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
                      <div className="flex flex-col gap-1">
                        <div className="text-xl font-bold">{content.title}</div>
                        {content.subTitle && (
                          <div className="text-base-foreground-weak text-xs">
                            {content.subTitle}
                          </div>
                        )}
                      </div>
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
