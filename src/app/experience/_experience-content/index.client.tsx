"use client";

import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { type Project } from "@/api/models/project";
import { Button } from "@/components/ui/styled/button";
import { Dialog } from "@/components/ui/styled/dialog";
import { Heading2 } from "@/components/ui/styled/heading2";
import { DialogTrigger } from "@/components/ui/unstyled/dialog";
import { parseSearchParamsClient } from "@/features/experience/query";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

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
                        {project.hasDesignPortfolio && (
                          <Dialog
                            trigger={
                              <DialogTrigger
                                as={Button}
                                className={cn(
                                  "mt-4",
                                  "flex items-center",
                                  "group lg:inline-flex lg:items-center",
                                )}
                              >
                                <span>この案件のデザイン実績を見る</span>
                                <span
                                  className={cn(
                                    "ml-1 inline-block lg:ml-1.5",
                                    "lg:transition-transform lg:duration-300 lg:group-hover:translate-x-0.5 lg:motion-reduce:transform-none",
                                  )}
                                >
                                  <ArrowRight
                                    aria-hidden="true"
                                    className="size-4"
                                  />
                                </span>
                              </DialogTrigger>
                            }
                            dialogTitle="閲覧の確認"
                            dialogBody={
                              <>
                                <p>
                                  デザイン実績の閲覧にはユーザー名とパスワードが必要です。
                                </p>
                                <p>
                                  不明な場合は長谷川または求人担当者様にお問い合わせください。
                                </p>
                              </>
                            }
                            dialogButtons={[
                              {
                                content: "キャンセル",
                                variant: "outline",
                              },
                              {
                                content: "閲覧に進む",
                                variant: "fill",
                                onClick: () => {
                                  window.location.href = routes[
                                    "portfolio/[id]"
                                  ].href(project.id);
                                },
                              },
                            ]}
                          />
                        )}
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
