"use client";

import { Lock } from "lucide-react";

import { type Project } from "@/api/models/project";
import { Dialog } from "@/components/ui/styled/dialog";
import { DialogTrigger } from "@/components/ui/unstyled/dialog";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function ContentButton({ project }: { project: Project }) {
  const { projectTags, assignTags, jobTypeTags } = groupTags(project.tags);

  return (
    <Dialog
      trigger={
        <DialogTrigger
          className={cn(
            "group flex w-full flex-col gap-3 rounded-sm border border-stone-300 px-5 py-4 text-left transition-colors ease-out",
            "hover:border-foreground-primary hover:bg-stone-50",
            "active:border-foreground-primary active:bg-stone-50",
          )}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Lock size={20} className="shrink-0" />
              <div className="text-xl font-bold">{`${project.title} / ${project.roles.join("・")}`}</div>
            </div>
            {project.subTitle && (
              <div className="text-foreground-secondary text-xs">
                {project.subTitle}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="hidden flex-wrap items-center gap-1.5 lg:flex">
              <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                案件: {projectTags.map((tag) => tag.label).join(" / ")}
              </Tag>
              <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                参画: {assignTags.map((tag) => tag.label).join(" / ")}
              </Tag>
              <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
                稼働: {jobTypeTags.map((tag) => tag.label).join(" / ")}
              </Tag>
            </div>
            <div className="text-foreground-secondary text-sm">
              {project.start} - {project.end}
            </div>
          </div>
        </DialogTrigger>
      }
      dialogTitle="閲覧の確認"
      dialogBody={
        <>
          <p>デザイン実績の閲覧にはユーザー名とパスワードが必要です。</p>
          <p>不明な場合は長谷川または求人担当者様にお問い合わせください。</p>
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
            window.location.href = routes["portfolio/[id]"].href(project.id);
          },
        },
      ]}
    />
  );
}
