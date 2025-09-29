import { type Metadata } from "next";
import Link from "next/link";

import { getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { SITE_TITLE } from "@/constants";
import { parseSearchParams } from "@/features/experience/query";
import { routes } from "@/routes";
import { assertNever } from "@/utils/misc";

import { ExperienceContent } from "./_experience-content";
import { getAllExperiences } from "./_experience-content/data";

export const metadata: Metadata = {
  title: `${routes.experience.label} | ${SITE_TITLE}`,
};

export const dynamic = "error";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { contents: projects } = await getProjects();

  const parsedSearchParams = await parseSearchParams(searchParams);

  // filter by client
  const filteredProjects = projects.filter((project) => {
    if (parsedSearchParams === "main") {
      return project.type.includes("main");
    }
    if (parsedSearchParams === "sub") {
      return project.type === "sub";
    }
    return assertNever(parsedSearchParams);
  });

  const experiences = getAllExperiences(filteredProjects);

  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="flex flex-col gap-4 text-center">
            <Heading1>{routes.experience.label}</Heading1>
            <p className="text-foreground-secondary">
              詳細なスキルシートについては
              <TextLink
                href={routes.contact.href}
                as={Link}
                className="text-foreground-primary"
                withUnderline
              >
                お問い合わせ
              </TextLink>
              からご連絡ください。
            </p>
          </div>
          <ExperienceContent
            experiences={experiences}
            searchParams={searchParams}
          />
        </section>
      </Container>
    </div>
  );
}
