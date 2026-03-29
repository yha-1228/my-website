import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { match } from "ts-pattern";
import { z } from "zod";

import { getProject, getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { Timeline } from "@/components/ui/styled/timeline";
import { SITE_TITLE } from "@/constants";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { BaseTemplate } from "@/features/template/base-template";
import { SectionTemplate } from "@/features/template/section-template";
import { createSearchString } from "@/utils/routing";
import { cx } from "@/utils/styling";

import { BackLink } from "./_back-button";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;

  const awaitedSearchParams = await searchParams;
  const searchParamsParseReturn = z
    .object({ from: z.string() })
    .safeParse(awaitedSearchParams);
  const parsedSearchParams = searchParamsParseReturn.success
    ? searchParamsParseReturn.data
    : undefined;

  // indexを取得するため、単体取得APIは使わない
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <BaseTemplate insertLogoutBanner>
      <Container className="flex flex-col gap-8 md:max-w-(--breakpoint-md)">
        <SectionTemplate
          as="article"
          title={
            <div className="relative flex w-full justify-center">
              <div className="inline-flex items-center gap-4 justify-self-center">
                <Heading1 as="span">{project.title}</Heading1>
                <div className="bg-foreground-primary inline-block grow-0 rounded-sm px-1.5 text-xs font-normal whitespace-nowrap text-white sm:text-sm">
                  {match(project.newOrRenewal)
                    .with("N", () => "新規")
                    .with("R", () => "リニューアル")
                    .otherwise(() => "新規/リニューアルを入力してください")}
                </div>
              </div>
              <BackLink
                className="absolute top-[50%] left-0 translate-y-[-50%]"
                href={`/careers${createSearchString(JSON.parse(parsedSearchParams?.from ?? "{}"))}`}
              />
            </div>
          }
        >
          <div className="border-t border-solid border-t-stone-300 pt-5 *:[h2]:first:sr-only">
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
        </SectionTemplate>

        <article hidden>
          <header className="flex items-center gap-4">
            <Heading1>{project.title}</Heading1>
            <div className="bg-foreground-primary inline-block grow-0 rounded-sm px-1.5 text-xs font-normal whitespace-nowrap text-white sm:text-sm">
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

        <BackLink
          href={`/careers${createSearchString(JSON.parse(parsedSearchParams?.from ?? "{}"))}`}
        />
      </Container>
    </BaseTemplate>
  );
}
