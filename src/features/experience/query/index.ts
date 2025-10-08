import { type ReadonlyURLSearchParams } from "next/navigation";
import { z } from "zod";

export type JobCategory = "all" | "main" | "sub";

export type Role = "all" | "dev" | "design";

export function parseSearchParamsClient(
  searchParams: ReadonlyURLSearchParams,
): { jobCategory: JobCategory; role: Role } {
  const jobCategorySchema = z.enum([
    "all",
    "main",
    "sub",
  ] as const satisfies JobCategory[]);
  const defaultJobCategory = "all" as const satisfies JobCategory;
  const parsedJobCategory = jobCategorySchema.safeParse(
    searchParams.get("jobCategory"),
  );

  const roleSchema = z.enum(["all", "dev", "design"] as const satisfies Role[]);
  const defaultRole = "all" as const satisfies Role;
  const parsedRole = roleSchema.safeParse(searchParams.get("role"));

  return {
    jobCategory: parsedJobCategory.success
      ? parsedJobCategory.data
      : defaultJobCategory,
    role: parsedRole.success ? parsedRole.data : defaultRole,
  };
}
