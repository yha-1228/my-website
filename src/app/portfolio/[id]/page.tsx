import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { SITE_TITLE } from "@/constants";
import { LogoutBanner } from "@/features/basic-auth/logout-banner";
import { HtmlRenderer } from "@/features/blog/html-renderer";
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
  const { contents } = await getProjects();
  return contents.map((content) => ({ id: content.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

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
            <header>
              <Heading1>{project.title}</Heading1>
              <p className="text-foreground-secondary mt-4 text-sm font-normal">
                {project.start} - {project.end}
              </p>
            </header>
            <div className="mt-8 flex flex-col gap-10 border-t border-solid border-t-stone-300 pt-5">
              <div
                className={cx(
                  "border-foreground-primary flex flex-col gap-2 rounded-sm border px-6 py-5 text-sm",
                  "[&>dl>dt]:font-bold",
                )}
              >
                <dl>
                  <dt className="font-bold">体制</dt>
                  <dd>{project.structureAndRole?.replace(/,/g, " / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">役割</dt>
                  <dd>{project.roles.join(" / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">UX階層</dt>
                  <dd>{project.uxLayers.join(" / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">デザインツール</dt>
                  <dd>{project.tools?.replace(/,/g, " / ")}</dd>
                </dl>
                <dl>
                  <dt className="font-bold">言語/FWなど</dt>
                  <dd>{project.langAndFws?.replace(/,/g, " / ")}</dd>
                </dl>
              </div>

              <HtmlRenderer html={project.body || ""} />
            </div>
          </article>

          <BackButton />
        </Container>
      </div>
    </>
  );
}
