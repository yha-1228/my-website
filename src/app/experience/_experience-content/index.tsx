import { type MicroCMSQueries } from "microcms-js-sdk";

import { getProjects } from "@/api/endpoints/project";
import { type parseSearchParams } from "@/features/experience/query";
import { assertNever } from "@/utils/misc";

import { getAllExperiences } from "./data";
import { Client } from "./index.client";

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

export async function ExperienceContent({
  parsedSearchParams,
}: {
  parsedSearchParams: Awaited<ReturnType<typeof parseSearchParams>>;
}) {
  const queries = createQueries(parsedSearchParams);
  const { contents: projects } = await getProjects(queries);

  const experiences = getAllExperiences(projects);

  return <Client experiences={experiences} />;
}
