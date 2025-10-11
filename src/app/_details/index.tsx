import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type JSX, type ReactNode } from "react";

import { getPortfolioIntroduction } from "@/api/endpoints/portfolio-introduction";
import { getProjects } from "@/api/endpoints/project";
import { type Project } from "@/api/models/project";
import { Button } from "@/components/ui/styled/button";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Panel, PanelList, Tab, TabList } from "@/components/ui/unstyled/tabs";
import { TabsQueryProvider } from "@/components/ui/unstyled/tabs-query";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { isDesign, isDev } from "@/features/project";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

function IntroductionDl({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) {
  return (
    <dl
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:gap-0",
        "border-b border-b-stone-300 py-8",
        "first:border-t first:border-t-stone-300",
      )}
    >
      <dt className="shrink-0 text-left text-xl leading-[1.3] font-bold whitespace-nowrap lg:w-[196px]">
        {header}
      </dt>
      <dd className="align-top leading-[1.6]">{children}</dd>
    </dl>
  );
}

function ExperienceLinkButton({
  role,
  projects,
}: {
  role: "design" | "dev";
  projects: Project[];
}) {
  const labels = {
    design: (
      <span>
        デザインの職務経歴
        <span className="palt">（{projects.filter(isDesign).length}件）</span>
        を見る
      </span>
    ),
    dev: (
      <span>
        開発の職務経歴
        <span className="palt">（{projects.filter(isDev).length}件）</span>
        を見る
      </span>
    ),
  } as const satisfies Record<typeof role, JSX.Element>;

  return (
    <Button
      as={Link}
      size="lg"
      href={`${routes.experience.href}?role=${role}`}
      className={cn(
        "flex items-center",
        "group lg:inline-flex lg:items-center lg:px-6 lg:text-lg",
        "w-full lg:w-1/2",
      )}
    >
      {labels[role]}
      <span
        className={cn(
          "ml-1 inline-block lg:ml-1.5",
          "lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1 lg:motion-reduce:transform-none",
        )}
      >
        <ArrowRight aria-hidden="true" className="size-5" />
      </span>
    </Button>
  );
}

export async function Detail() {
  const [portfolioIntroduction, { contents: projects }] = await Promise.all([
    getPortfolioIntroduction(),
    getProjects(),
  ]);

  return (
    <Container>
      <section className="flex flex-col gap-10 border-t pt-8">
        <Heading1>詳細</Heading1>

        <TabsQueryProvider
          name="detailSectionTab"
          values={["dev", "design"]}
          className="flex flex-col gap-8"
        >
          <TabList
            className={cn(
              "flex gap-4",
              "*:text-foreground-secondary *:text-lg",
              "*:data-[selected=true]:text-foreground-primary",
            )}
          >
            <Tab>開発</Tab>
            <Tab>デザイン</Tab>
          </TabList>
          <PanelList>
            <Panel className="flex flex-col gap-8">
              <IntroductionDl header="概要">
                <HtmlRenderer html={portfolioIntroduction.overviewDev} />
              </IntroductionDl>
              <div className="flex flex-col items-center">
                <ExperienceLinkButton role="dev" projects={projects} />
              </div>
            </Panel>
            <Panel className="flex flex-col gap-8">
              <div>
                <IntroductionDl header="自己紹介">
                  <HtmlRenderer html={portfolioIntroduction.overviewDesign} />
                </IntroductionDl>
                <IntroductionDl header="強み">
                  <HtmlRenderer html={portfolioIntroduction.tsuyomiDesign} />
                </IntroductionDl>
                <IntroductionDl header="今後の意向">
                  <HtmlRenderer html={portfolioIntroduction.kongoDesign} />
                </IntroductionDl>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ExperienceLinkButton role="design" projects={projects} />
                <p className="text-foreground-secondary text-sm">
                  実績詳細も上記ページから閲覧できます
                </p>
              </div>
            </Panel>
          </PanelList>
        </TabsQueryProvider>
      </section>
    </Container>
  );
}
