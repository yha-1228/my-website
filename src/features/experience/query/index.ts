import { type ReadonlyURLSearchParams } from "next/navigation";
import { z } from "zod";

export type JobCategory = "main" | "sub";

export function parseSearchParamsClient(searchParams: ReadonlyURLSearchParams) {
  const jobCategorySchema = z.enum([
    "main",
    "sub",
  ] as const satisfies JobCategory[]);
  const parsedJobCategory = jobCategorySchema.safeParse(
    searchParams.get("jobCategory"),
  );
  return parsedJobCategory.success
    ? parsedJobCategory.data
    : ("main" as const satisfies JobCategory);
}
