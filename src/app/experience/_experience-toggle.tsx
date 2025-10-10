"use client";

import { useSearchParams } from "next/navigation";

import {
  type JobCategory,
  parseSearchParamsClient,
  type Role,
} from "@/features/experience/query";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { entriesOf } from "@/utils/object";
import { cn } from "@/utils/styling";

import { useMediaQuery } from "../_layouts/header/use-media-query";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./_experience-content/ui/toggle-group";

const jobCategoryLabelMap = {
  all: "すべて",
  main: "フルタイム",
  sub: "副業",
} as const satisfies Record<JobCategory, string>;

const roleLabelMap = {
  all: "すべて",
  dev: "開発",
  design: "デザイン",
} as const satisfies Record<Role, string>;

export function ExperienceToggle({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParamsClient(searchParams);

  const updateSearchParams = useUpdateSearchParams();

  // `(min-width: breakpoint.md)`
  const isMd = useMediaQuery(`(min-width: 768px)`);
  const scrollYOnToggleClick =
    isMd.state === "loaded" && isMd.matches ? 170 : 190;

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        "md:grid md:grid-cols-2 md:gap-4",
        "rounded-md p-4",
        "border border-stone-300 bg-white shadow-lg",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        {/* TODO: ベタ書きのID管理を改善する */}
        <div className="sr-only font-bold md:not-sr-only" id="1">
          参画
        </div>
        <ToggleGroup aria-labelledby="1">
          {entriesOf(jobCategoryLabelMap).map(([value, label]) => (
            <ToggleGroupItem
              key={value}
              checked={parsedSearchParams.jobCategory === value}
              onClick={() => {
                updateSearchParams("jobCategory", value);

                if (window.scrollY > scrollYOnToggleClick) {
                  window.scrollTo({
                    top: scrollYOnToggleClick,
                    behavior: "smooth",
                  });
                }
              }}
              className="whitespace-nowrap"
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        {/* TODO: ベタ書きのID管理を改善する */}
        <div className="sr-only font-bold md:not-sr-only" id="2">
          役割
        </div>
        <ToggleGroup aria-labelledby="2">
          {entriesOf(roleLabelMap).map(([value, label]) => (
            <ToggleGroupItem
              key={value}
              checked={parsedSearchParams.role === value}
              onClick={() => {
                updateSearchParams("role", value);

                if (window.scrollY > scrollYOnToggleClick) {
                  window.scrollTo({
                    top: scrollYOnToggleClick,
                    behavior: "smooth",
                  });
                }
              }}
              className="whitespace-nowrap"
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
