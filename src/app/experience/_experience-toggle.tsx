"use client";

import { useSearchParams } from "next/navigation";

import {
  type JobCategory,
  parseSearchParamsClient,
} from "@/features/experience/query";
import { routes } from "@/routes";
import { entriesOf } from "@/utils/object";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "./_experience-content/ui/toggle-group";

const jobCategoryLabelMap = {
  main: "フルタイム",
  sub: "副業",
} as const satisfies Record<JobCategory, string>;

export function ExperienceToggle() {
  const searchParams = useSearchParams();
  const parsedSearchParams = parseSearchParamsClient(searchParams);

  return (
    <ToggleGroup className="mx-auto mt-10">
      {entriesOf(jobCategoryLabelMap).map(([value, label]) => (
        <ToggleGroupItem
          key={value}
          checked={parsedSearchParams === value}
          href={`${routes.experience.href}?jobCategory=${value}`}
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
