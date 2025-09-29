import { type MicroCMSQueries } from "microcms-js-sdk";
import { type Metadata } from "next";
import Link from "next/link";
import { z } from "zod";

import { getProjects } from "@/api/endpoints/project";
import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";
import { TextLink } from "@/components/ui/styled/text-link";
import { SITE_TITLE } from "@/constants";
import { routes } from "@/routes";
import { assertNever } from "@/utils/misc";

import { ExperienceContent, type JobCategory } from "./_experience-content";
import { getAllExperiences } from "./_experience-content/data";

export const metadata: Metadata = {
  title: `${routes.experience.label} | ${SITE_TITLE}`,
};

async function parseSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const awaitedSearchParams = await searchParams;

  const jobCategorySchema = z.enum([
    "main",
    "sub",
  ] as const satisfies JobCategory[]);
  const parsedJobCategory = jobCategorySchema.safeParse(
    awaitedSearchParams.jobCategory,
  );
  return parsedJobCategory.success
    ? parsedJobCategory.data
    : ("main" as const satisfies JobCategory);
}

function createQueries(
  parsedSearchParams: Awaited<ReturnType<typeof parseSearchParams>>,
): MicroCMSQueries {
  if (parsedSearchParams === "main") {
    return { filters: `type[contains]main` };
  }
  if (parsedSearchParams === "sub") {
    return { filters: `type[contains]sub` };
  }

  return assertNever(parsedSearchParams);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parsedSearchParams = await parseSearchParams(searchParams);

  const queries = createQueries(parsedSearchParams);
  const { contents: projects } = await getProjects(queries);

  const experiences = getAllExperiences(projects);

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
            initialSelectedValue={parsedSearchParams}
          />
        </section>
      </Container>
    </div>
  );
}
