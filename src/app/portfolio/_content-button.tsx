"use client";

import { Lock, X } from "lucide-react";

import { type Project } from "@/api/models/project";
import { Button } from "@/components/ui/styled/button";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/unstyled/dialog";
import { groupTags } from "@/features/blog/misc";
import { Tag } from "@/features/portfolio/tag";
import { routes } from "@/routes";
import { cn } from "@/utils/styling";

export function ContentButton({ project }: { project: Project }) {
  const { projectTags, assignTags, jobTypeTags } = groupTags(project.tags);

  const onConfirmClick = () => {
    window.location.href = routes["portfolio/[id]"].href(project.id);
  };

  return (
    <DialogProvider>
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
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "fixed inset-0 z-[10000] bg-[#000]/50",
            // animation
            "fill-mode-forwards",
            "data-[state=enter]:animate-in data-[state=leave]:animate-out",
            "data-[state=leave]:fade-out-0 data-[state=enter]:fade-in-0",
          )}
        />
        <DialogContent
          className={cn(
            "fixed top-[50%] left-[50%] z-[100001] translate-x-[-50%] translate-y-[-50%] sm:top-[10%] sm:translate-y-[0%]",
            "w-full max-w-[calc(100%-calc(var(--screen-margin)*2))] sm:max-w-[560px]",
            "overflow-hidden rounded-lg bg-white",
            "flex flex-col gap-7",
            // animation
            "fill-mode-forwards",
            "data-[state=enter]:animate-in data-[state=leave]:animate-out",
            "data-[state=leave]:fade-out-0 data-[state=enter]:fade-in-0",
            "data-[state=leave]:zoom-out-95 data-[state=enter]:zoom-in-95",
          )}
        >
          <div className="flex items-center justify-between pt-6 pr-6 pl-8">
            <DialogTitle className="text-2xl font-bold">閲覧の確認</DialogTitle>
            <DialogClose
              aria-label="閉じる"
              className="rounded-touchable inline-flex size-10 items-center justify-center transition-[opacity,background-color] hover:bg-stone-100 active:bg-stone-100 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X />
            </DialogClose>
          </div>
          <div className="px-8">
            <p>デザイン実績の閲覧にはユーザー名とパスワードが必要です。</p>
            <p>不明な場合は長谷川または求人担当者様にお問い合わせください。</p>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-t-stone-300 bg-stone-50 px-8 py-5 sm:flex-row sm:justify-end">
            <DialogClose as={Button} variant="outline">
              キャンセル
            </DialogClose>
            <DialogClose as={Button} onClick={onConfirmClick}>
              閲覧に進む
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogProvider>
  );
}
