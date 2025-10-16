"use client";

import { LockIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { type Project } from "@/api/models/project";
import { DialogTrigger } from "@/components/ui/headless/dialog";
import { Button } from "@/components/ui/styled/button";
import { Dialog } from "@/components/ui/styled/dialog";
import { parseSearchParamsClient } from "@/features/experience/query";
import { isDesign, isDev } from "@/features/project";
import { SkillTag } from "@/features/skill-tag";
import { routes } from "@/routes";
import { cn, cx } from "@/utils/styling";

import { typeNameMap } from "./models";
import { Timeline } from "./ui/timeline";
import { ellipsisTextByComma, splitText } from "./utils";

export function Client({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParamsClient(searchParams);

  const filteredProjects = projects
    .filter((project) => {
      if (parsedSearchParams.jobCategory === "all") {
        return project;
      }
      if (parsedSearchParams.jobCategory === "main") {
        return project.type.includes("main");
      }
      if (parsedSearchParams.jobCategory === "sub") {
        return project.type === "sub";
      }
    })
    .filter((project) => {
      if (parsedSearchParams.role === "all") {
        return project;
      }
      if (parsedSearchParams.role === "dev") {
        return isDev(project);
      }
      if (parsedSearchParams.role === "design") {
        return isDesign(project);
      }
    });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-2xl">{filteredProjects.length}</span>
        <span className="ml-0.5 text-sm">件</span>
      </div>
      <Timeline
        items={filteredProjects.map((project) => {
          const langAndFwsSpitted = splitText(project.langAndFws, 3);
          const toolsSplitted = splitText(project.tools, 3);
          return {
            point:
              `${project.start} - ${project.end}` +
              (project.blank ? ` (空白期間: ${project.blank})` : ""),
            heading: (
              <div className="flex flex-col items-start gap-x-2 gap-y-1 sm:flex-row sm:items-center">
                <div>{project.title}</div>
                <div className="inline-block grow-0 rounded-sm border border-stone-200 bg-stone-100 px-1.5 text-xs font-normal whitespace-nowrap sm:text-sm">
                  {typeNameMap[project.type]}
                </div>
              </div>
            ),
            subHeading: project.roles.join(" / "),
            content: (
              <>
                <div
                  className={cn(
                    "flex flex-col",
                    "gap-4 border-y border-y-stone-200 py-4",
                    "sm:gap-1.5 sm:rounded-md sm:border sm:border-stone-200 sm:bg-stone-50 sm:px-5",
                  )}
                >
                  {project.langAndFws && (
                    <div className="flex flex-col items-start gap-y-2 sm:flex-row">
                      <span className="font-bold sm:w-20 sm:shrink-0">
                        言語/FW
                      </span>
                      <span className="text-sm sm:hidden">
                        {ellipsisTextByComma(project.langAndFws, 3)}
                      </span>
                      <div className="hidden flex-wrap items-center gap-2 sm:flex">
                        {langAndFwsSpitted.texts.map((text, i) => (
                          <SkillTag key={i}>{text}</SkillTag>
                        ))}
                        {langAndFwsSpitted.isOver && (
                          <span className="text-foreground-secondary text-sm">
                            etc.
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-start gap-y-0.5 sm:flex-row">
                    <span className="font-bold sm:w-20 sm:shrink-0">
                      ツール
                    </span>
                    <span className="text-sm sm:hidden">
                      {ellipsisTextByComma(project.tools, 3)}
                    </span>
                    <div className="hidden flex-wrap items-center gap-2 sm:flex">
                      {toolsSplitted.texts.map((text, i) => (
                        <SkillTag key={i}>{text}</SkillTag>
                      ))}
                      {toolsSplitted.isOver && (
                        <span className="text-foreground-secondary text-sm">
                          etc.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col gap-1.5 pt-3 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: project.descriptionContent,
                  }}
                />
                {project.hasDesignPortfolio && (
                  <div className="mt-3">
                    <Dialog
                      trigger={
                        <DialogTrigger
                          as={Button}
                          variant="outline"
                          className={cx(
                            "flex w-full items-center gap-2 sm:w-auto",
                            "lg:inline-flex lg:items-center",
                          )}
                        >
                          <LockIcon aria-hidden="true" className="size-4" />
                          <span>デザイン実績を見る</span>
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
                  </div>
                )}
              </>
            ),
          };
        })}
      />
    </div>
  );
}
