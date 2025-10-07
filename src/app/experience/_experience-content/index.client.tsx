"use client";

import { useSearchParams } from "next/navigation";

import { type Project } from "@/api/models/project";
import { Heading2 } from "@/components/ui/styled/heading2";
import { parseSearchParamsClient } from "@/features/experience/query";

import { sortedTypes, typeKikanMap, typeNameMap } from "./models";
import { Timeline } from "./ui/timeline";
import { ellipsisTextByComma } from "./utils";

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

  return (
    <div className="mt-10 space-y-12">
      {sortedTypes
        .filter((type) => {
          const projectTypes = filteredProjects.map(({ type }) => type);
          return projectTypes.includes(type);
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
              items={filteredProjects
                .filter((project) => project.type === type)
                .map((project: Project) => ({
                  point:
                    `${project.start} - ${project.end}` +
                    (project.blank ? ` (空白期間: ${project.blank})` : ""),
                  heading: `${project.title} / ${project.roles.join("・")}`,
                  content: (
                    <>
                      <div
                        className="space-y-2.5"
                        dangerouslySetInnerHTML={{
                          __html: project.descriptionContent || "",
                        }}
                      />
                      <div className="mt-4 space-y-1">
                        <p>
                          <b>言語/FW:</b>{" "}
                          {ellipsisTextByComma(project.langAndFws, 3)}
                        </p>
                        <p>
                          <b>ツール:</b> {ellipsisTextByComma(project.tools, 3)}
                        </p>
                      </div>
                    </>
                  ),
                }))}
            />
          </section>
        ))}
    </div>
  );
}
