"use client";

import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Heading2 } from "@/components/ui/styled/heading2";
import { routes } from "@/routes";
import { assertNever } from "@/utils/misc";
import { entriesOf } from "@/utils/object";

import {
  allExperiences,
  type Experience,
  typeKikanMap,
  typeNameMap,
} from "./data";
import { Timeline, type TimelineItem } from "./timeline";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const jobCategoryLabelMap = {
  all: "すべて",
  main: "本業",
  sub: "副業",
} as const;

type JobCategory = keyof typeof jobCategoryLabelMap;

function findExperiencesByJobCategory(
  experiences: Experience[],
  jobCategory: JobCategory,
) {
  if (jobCategory === "all") {
    return experiences;
  }

  if (jobCategory === "main") {
    return experiences.filter((experience) => experience.type !== "sub");
  }

  if (jobCategory === "sub") {
    return experiences.filter((experience) => experience.type === "sub");
  }

  return assertNever(jobCategory);
}

function parseSearchParams(searchParams: ReadonlyURLSearchParams) {
  const jobCategory = searchParams.get("jobCategory");
  const safeParsedFilter = z
    .enum(["all", "main", "sub"] as const satisfies JobCategory[])
    .safeParse(jobCategory);

  return {
    jobCategory: safeParsedFilter.success ? safeParsedFilter.data : null,
  };
}

// ----------------------------------------

export function ExperienceContent() {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParams(searchParams);

  const experiences = findExperiencesByJobCategory(
    allExperiences,
    parsedSearchParams.jobCategory || "all",
  );
  const types = [...new Set(experiences.map((experience) => experience.type))];

  return (
    <>
      <ToggleGroup
        className="mx-auto mt-10"
        initialSelectedValue={parsedSearchParams.jobCategory || "all"}
      >
        {entriesOf(jobCategoryLabelMap).map(([value, label]) => (
          <ToggleGroupItem
            key={value}
            value={value}
            href={`${routes.experiences.href}?jobCategory=${value}`}
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="mt-10 space-y-12">
        {types.map((type) => (
          <section className="space-y-5" key={type}>
            <div>
              <Heading2>{typeNameMap[type]}</Heading2>
              {typeKikanMap[type] && (
                <div className="text-base-foreground-weak mt-6 text-sm">
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
                      <div className="text-base-foreground mt-2 text-lg font-normal">
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
    </>
  );
}
