import { z } from "zod";

export const tagSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  label: z.string(),
  category: z.array(z.string()),
});

export type Tag = z.infer<typeof tagSchema>;

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
      tags: z.array(tagSchema),
      start: z.string(),
      end: z.string(),
      structureAndRole: z.string(),
      tools: z.string(),
      langAndFws: z.string(),
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
  tags: z.array(tagSchema),
  start: z.string(),
  end: z.string(),
  structureAndRole: z.string(),
  tools: z.string(),
  langAndFws: z.string(),
});

export type GetPortfolioContentResponse = z.infer<
  typeof getPortfolioContentResponseSchema
>;
