import { z } from "zod";

export type JobCategory = "main" | "sub";

export async function parseSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const awaitedSearchParams = await searchParams;

  const jobCategorySchema = z.enum([
    "main",
    "sub",
  ] as const satisfies JobCategory[]);
  const parsedJobCategory = jobCategorySchema.safeParse(
    awaitedSearchParams.jobCategory,
  );
  return parsedJobCategory.success
    ? parsedJobCategory.data
    : ("main" as const satisfies JobCategory);
}
