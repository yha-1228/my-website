"use client";

import { Lock } from "lucide-react";

import { type Project } from "@/api/models/project";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function ContentButton({ project }: { project: Project }) {
  const { methodTags, projectTags, uxLayerTags, assignTags, jobTypeTags } =
    groupTags(project.tags);

  return (
    <button
      type="button"
      onClick={() => {
        const confirmed = window.confirm(
          [
            "デザイン実績の閲覧にはユーザー名とパスワードが必要です。\n",
            "不明な場合は長谷川または求人のご担当者様にお問い合わせください。",
          ].join(""),
        );

        if (!confirmed) return;

        window.location.href = routes["portfolio/[id]"].href(project.id);
      }}
      className={cn(
        "group flex w-full flex-col gap-3 rounded-sm border border-stone-300 px-5 py-4 text-left transition-colors ease-out",
        "hover:border-foreground-primary hover:bg-stone-50",
        "active:border-foreground-primary active:bg-stone-50",
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Lock size={20} className="shrink-0" />
          <div className="text-xl font-bold">{project.title}</div>
        </div>
        {project.subTitle && (
          <div className="text-foreground-secondary text-xs">
            {project.subTitle}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
            手法: {methodTags.map((tag) => tag.label).join(" / ")}
          </Tag>
          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
            案件: {projectTags.map((tag) => tag.label).join(" / ")}
          </Tag>
          <Tag className="border border-transparent group-hover:border-stone-300 group-active:border-stone-300">
            UX階層: {uxLayerTags.map((tag) => tag.label).join(" / ")}
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
    </button>
  );
}
