import { ChevronLeft } from "lucide-react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { IDS, SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/basic-auth/logout-banner";
import { HtmlRenderer } from "@/features/blog/html-renderer";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";

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
  const { contents } = await getProjects();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const { methodTags, projectTags, uxLayerTags, assignTags, jobTypeTags } =
    groupTags(project.tags);

  return (
    <>
      <LogoutBanner />
      <div className="py-14">
        <Container className="md:max-w-(--breakpoint-md)">
          <TextLink
            href={`${routes.portfolio.href}#${IDS["portfolio-projects-heading"]}`}
            className="inline-flex items-center space-x-1"
          >
            <ChevronLeft />
            <span>実績一覧に戻る</span>
          </TextLink>

          <article className="mt-8">
            <header>
              <Heading1>{project.title}</Heading1>
              <p className="text-foreground-secondary mt-4 text-sm font-normal">
                {project.start} - {project.end}
              </p>
            </header>
            <div className="mt-8 flex flex-col gap-10 border-t border-solid border-t-stone-300 pt-5">
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                  手法: {methodTags.map((tag) => tag.label).join(" / ")}
                </Tag>
                <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                  案件: {projectTags.map((tag) => tag.label).join(" / ")}
                </Tag>
                <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                  UX階層: {uxLayerTags.map((tag) => tag.label).join(" / ")}
                </Tag>
                <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                  参画: {assignTags.map((tag) => tag.label).join(" / ")}
                </Tag>
                <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                  稼働: {jobTypeTags.map((tag) => tag.label).join(" / ")}
                </Tag>
              </div>

              <div className="border-foreground-primary flex flex-col gap-2 rounded-sm border px-6 py-5 text-sm">
                <dl>
                  <dt className="font-bold">体制</dt>
                  <dd>{project.structureAndRole}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">役割</dt>
                  <dd>{project.roles.join(", ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">デザインツール</dt>
                  <dd>{project.tools}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">言語/FWなど</dt>
                  <dd>{project.langAndFws}</dd>
                </dl>
              </div>

              <HtmlRenderer html={project.body || ""} />
            </div>
          </article>

          <TextLink
            href={`${routes.portfolio.href}#${IDS["portfolio-projects-heading"]}`}
            className="mt-12 inline-flex items-center space-x-1"
          >
            <ChevronLeft />
            <span>実績一覧に戻る</span>
          </TextLink>
        </Container>
      </div>
    </>
  );
}
