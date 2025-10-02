"use client";

import { Lock, X } from "lucide-react";
import { useState } from "react";

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
  const { methodTags, projectTags, uxLayerTags, assignTags, jobTypeTags } =
    groupTags(project.tags);

  const [didConfirmClick, setDidConfirmClick] = useState(false);

  const onConfirmClick = () => {
    setDidConfirmClick(true);
    window.location.href = routes["portfolio/[id]"].href(project.id);
  };

  return (
    <DialogProvider closeOnEscKeyDown={!didConfirmClick}>
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
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          closeOnClick={!didConfirmClick}
          className="fixed inset-0 z-[10000] bg-[#000]/50"
        />
        <DialogContent
          className={cn(
            "fixed top-[50%] left-[50%] z-[100001] translate-x-[-50%] translate-y-[-50%] sm:top-[10%] sm:translate-y-[0%]",
            "w-full max-w-[calc(100%-calc(var(--screen-margin)*2))] sm:max-w-[560px]",
            "overflow-hidden rounded-lg bg-white",
            "flex flex-col gap-7",
          )}
        >
          <div className="flex items-center justify-between pt-6 pr-6 pl-8">
            <DialogTitle className="text-2xl font-bold">閲覧の確認</DialogTitle>
            <DialogClose
              aria-label="閉じる"
              className="inline-flex size-10 items-center justify-center transition-opacity hover:opacity-60 active:opacity-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={didConfirmClick}
            >
              <X />
            </DialogClose>
          </div>
          <div className="px-8">
            <p>デザイン実績の閲覧にはユーザー名とパスワードが必要です。</p>
            <p>不明な場合は長谷川または求人担当者様にお問い合わせください。</p>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-t-stone-300 bg-stone-50 px-8 py-5 sm:flex-row sm:justify-end">
            <DialogClose
              as={Button}
              variant="outline"
              disabled={didConfirmClick}
            >
              キャンセル
            </DialogClose>
            <Button
              type="button"
              onClick={onConfirmClick}
              disabled={didConfirmClick}
            >
              閲覧に進む
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogProvider>
  );
}
