import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

import { getPortfolioIntroduction } from "@/api/endpoints/portfolio-introduction";
import { getProjects } from "@/api/endpoints/project";
import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { isDesign } from "@/features/project";
import { SkillTag } from "@/features/skill-tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

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
          <dd className="align-top leading-[1.6]">{row.data}</dd>
        </dl>
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: `${routes.portfolio.label} | ${SITE_TITLE}`,
};

export default async function Page() {
  const [portfolioIntroduction, { contents: portfolioContents }] =
    await Promise.all([getPortfolioIntroduction(), getProjects()]);

  return (
    <div className="py-14">
      <Container>
        <section>
          <div className="flex flex-col gap-4 text-center">
            <Heading1>{routes.portfolio.label}</Heading1>
            <p className="text-foreground-secondary">
              デザイン経験のポートフォリオです。
              <br />
              エンジニア経験については別のページをご覧ください。
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-8">
            <div>
              <IntroductionDlList
                rows={[
                  {
                    header: "対応領域",
                    data: (
                      <div className="flex flex-wrap gap-2">
                        {portfolioIntroduction.scope.split(", ").map((text) => (
                          <SkillTag key={text}>{text}</SkillTag>
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
                            <SkillTag key={text}>{text}</SkillTag>
                          ))}
                      </div>
                    ),
                  },
                  {
                    header: "使用ツール",
                    data: (
                      <div className="flex flex-wrap gap-2">
                        {portfolioIntroduction.tools.split(", ").map((text) => (
                          <SkillTag key={text}>{text}</SkillTag>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />

              <IntroductionDlList
                rows={[
                  {
                    header: "自己紹介",
                    data: (
                      <HtmlRenderer html={portfolioIntroduction.overview} />
                    ),
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
            </div>

            <div className="flex flex-col items-center gap-2">
              <Button
                as={Link}
                size="lg"
                href={`${routes.experience.href}?role=design`}
                className={cn(
                  "flex items-center",
                  "group lg:inline-flex lg:items-center lg:px-6 lg:text-lg",
                  "w-full sm:w-1/2",
                )}
              >
                <span>
                  デザインの職務経歴
                  <span className="palt">
                    （{portfolioContents.filter(isDesign).length}件）
                  </span>
                  を見る
                </span>
                <span
                  className={cn(
                    "ml-1 inline-block lg:ml-1.5",
                    "lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none",
                  )}
                >
                  <ArrowRight aria-hidden="true" className="size-5" />
                </span>
              </Button>
              <p className="text-foreground-secondary text-sm">
                実績詳細も上記ページから閲覧できます
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
