"use client";

import { useSearchParams } from "next/navigation";

import { type Project } from "@/api/models/project";
import { Heading2 } from "@/components/ui/styled/heading2";
import { parseSearchParamsClient } from "@/features/experience/query";

import {
  getAllExperiences,
  sortedTypes,
  typeKikanMap,
  typeNameMap,
} from "./data";
import { Timeline, type TimelineItem } from "./timeline";

export function Client({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParamsClient(searchParams);

  const filteredProjects = projects.filter((project) => {
    if (parsedSearchParams === "main") {
      return project.type.includes("main");
    }
    if (parsedSearchParams === "sub") {
      return project.type === "sub";
    }
  });

  const experiences = getAllExperiences(filteredProjects);

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
                    heading: experience.kikan.includes("現在") ? (
                      <div className="flex items-center gap-2">
                        {heading}
                        <span className="bg-brand-base rounded-full px-2 py-1.5 text-xs leading-[1.2] font-normal text-white">
                          稼働中
                        </span>
                      </div>
                    ) : (
                      heading
                    ),
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
