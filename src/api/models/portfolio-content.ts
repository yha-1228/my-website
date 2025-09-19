import { z } from "zod";

export const getPortfolioContentsResponseSchema = z.object({
  contents: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
      revisedAt: z.string(),
      title: z.string(),
      body: z.string(),
      start: z.string(),
      end: z.string(),
      tags: z.array(
        z.object({
          id: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
          publishedAt: z.string(),
          revisedAt: z.string(),
          label: z.string(),
        }),
      ),
    }),
  ),
  totalCount: z.number(),
  offset: z.number(),
  limit: z.number(),
});

export type GetPortfolioContentsResponse = z.infer<
  typeof getPortfolioContentsResponseSchema
>;

export const getPortfolioContentResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  body: z.string(),
  start: z.string(),
  end: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
      revisedAt: z.string(),
      label: z.string(),
    }),
  ),
});

export type GetPortfolioContentResponse = z.infer<
  typeof getPortfolioContentResponseSchema
>;
