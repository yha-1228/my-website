import { type MicroCMSQueries } from "microcms-js-sdk";

import { getProjects } from "@/api/endpoints/project";
import { Heading2 } from "@/components/ui/styled/heading2";
import { type parseSearchParams } from "@/features/experience/query";
import { assertNever } from "@/utils/misc";

import {
  getAllExperiences,
  sortedTypes,
  typeKikanMap,
  typeNameMap,
} from "./data";
import { Timeline, type TimelineItem } from "./timeline";

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

  return (
    <div className="mt-10 space-y-12">
      {sortedTypes
        .filter((type) => {
          const experienceTypes = experiences.map(({ type }) => type);
          return experienceTypes.includes(type);
        })
        .map((type) => (
          <section className="space-y-5" key={type}>
            <div>
              <Heading2>{typeNameMap[type]}</Heading2>
              {typeKikanMap[type] && (
                <div className="text-foreground-secondary mt-6 text-sm">
                  {typeKikanMap[type]}
                </div>
              )}
            </div>
            <Timeline
              items={experiences
                .filter((experience) => experience.type === type)
                .map((experience) => {
                  const { kikan, title, projectCompanyName, description } =
                    experience;

                  const heading = projectCompanyName ? (
                    <>
                      {title} <br />
                      <div className="text-foreground-primary mt-2 text-lg font-normal">
                        {projectCompanyName}
                      </div>
                    </>
                  ) : (
                    title
                  );

                  const item: TimelineItem = {
                    point: kikan,
                    heading: heading,
                    content: description,
                  };

                  return item;
                })}
            />
          </section>
        ))}
    </div>
  );
}
