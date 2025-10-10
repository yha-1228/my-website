import { z, type ZodTypeAny } from "zod";

export function createListResponseSchema<T extends ZodTypeAny>(
  contentSchema: T,
) {
  return z.object({
    contents: z.array(contentSchema),
    totalCount: z.number(),
    offset: z.number(),
    limit: z.number(),
  });
}

export interface ListResponse<T> {
  contents: T[];
  totalCount: number;
  limit: number;
  offset: number;
}
