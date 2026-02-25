import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { match } from "ts-pattern";

import { getProject, getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Timeline } from "@/components/ui/styled/timeline";
import { SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/basic-auth/logout-banner";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { formatTitleWithNo, isDesign } from "@/features/project";
import { cx } from "@/utils/styling";

import { BackButton } from "./_back-button";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  return {
    title: `${project?.title} | ${SITE_TITLE}`,
  };
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const { contents: projects } = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

const h2ClassName = "mt-12 mb-6 text-2xl leading-tight font-bold first:mt-0";
const ulClassName = "pl-5 [&>li]:list-disc";

export default async function Page({ params }: Props) {
  const { id } = await params;

  // indexを取得するため、単体取得APIは使わない
  const { contents: projects } = await getProjects();
  const designProjects = projects.filter(isDesign);
  const project = designProjects.find((project) => project.id === id);
  const index = designProjects.findIndex((project) => project.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <LogoutBanner />
      <div className="py-14">
        <Container className="flex flex-col items-start gap-8 md:max-w-(--breakpoint-md)">
          <BackButton />

          <article>
            <header className="flex items-center gap-4">
              <Heading1>{formatTitleWithNo(index, project.title)}</Heading1>
              <div className="bg-foreground-primary rounded-x px-2 py-0.5 text-white">
                {match(project.newOrRenewal)
                  .with("N", () => "新規")
                  .with("R", () => "リニューアル")
                  .otherwise(() => "新規/リニューアルを入力してください")}
              </div>
            </header>
            <div className="mt-8 border-t border-solid border-t-stone-300 pt-5 *:[h2]:first:sr-only">
              <h2 className={h2ClassName}>案件概要</h2>
              <p>{project.designOverview}</p>

              <h2 className={h2ClassName}>概要</h2>
              <div
                className={cx(
                  "border-foreground-primary flex flex-col gap-1 rounded-sm border px-6 py-5 text-sm",
                  "[&>dl]:flex",
                  "[&>dl>dt]:shrink-0",
                  "[&>dl>dt]:font-bold",
                  "[&>dl>dt]:w-28",
                )}
              >
                <dl>
                  <dt className="font-bold">ツール</dt>
                  <dd>{project.tools?.replace(/,/g, " / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">期間</dt>
                  <dd>
                    {project.start} - {project.end}
                  </dd>
                </dl>
                <dl>
                  <dt className="font-bold">役割</dt>
                  <dd>{project.roles.join(" / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">チーム体制</dt>
                  <dd>{project.structureAndRole?.replace(/,/g, " / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">PC画面数</dt>
                  <dd>{project.pcScreenCount ?? "-"}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">SP画面数</dt>
                  <dd>{project.spScreenCount ?? "-"}</dd>
                </dl>
              </div>

              <h2 className={h2ClassName}>制作プロセス</h2>
              <Timeline
                bodyClassName="pb-8"
                colorSchema="neutral"
                hasBorderEachBody={false}
                items={project.processes?.map((process) => {
                  return {
                    point: process.title,
                    content: process.listItems ? (
                      <ul className={ulClassName}>
                        {process.listItems.split(", ").map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : undefined,
                  };
                })}
              />

              <HtmlRenderer className="mt-12" html={project.body || ""} />
            </div>
          </article>

          <BackButton />
        </Container>
      </div>
    </>
  );
}
