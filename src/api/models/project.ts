import { z } from "zod";

const tagSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  label: z.string(),
  category: z.array(z.string()),
});

export type ProjectTag = z.infer<typeof tagSchema>;

const projectSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  descriptionContent: z.string().optional(),
  subTitle: z.string().optional(),
  body: z.string().optional(),
  tags: z.array(tagSchema),
  start: z.string(),
  end: z.string(),
  blank: z.string().optional(),
  structureAndRole: z.string().optional(),
  tools: z.string().optional(),
  langAndFws: z.string().optional(),
  isDraft: z.boolean().optional(),
  hasDesignPortfolio: z.boolean().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const getProjectsResponseSchema = z.object({
  contents: z.array(projectSchema),
  totalCount: z.number(),
  offset: z.number(),
  limit: z.number(),
});

export type GetProjectsResponse = z.infer<typeof getProjectsResponseSchema>;

export const getProjectResponseSchema = projectSchema;

export type GetProjectResponse = z.infer<typeof getProjectResponseSchema>;
