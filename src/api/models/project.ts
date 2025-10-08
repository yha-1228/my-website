import { z } from "zod";

export const projectTagSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  label: z.string(),
  category: z.array(z.string()),
});

export type ProjectTag = z.infer<typeof projectTagSchema>;

export const projectSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  roles: z.array(z.string()),
  company: z.string().optional(),
  descriptionContent: z.string().optional(),
  body: z.string().optional(),
  tags: z.array(projectTagSchema),
  start: z.string(),
  end: z.string(),
  blank: z.string().optional(),
  structureAndRole: z.string().optional(),
  tools: z.string().optional(),
  langAndFws: z.string().optional(),
  isDraft: z.boolean().optional(),
  hasDesignPortfolio: z.boolean().optional(),
  type: z.enum(["main-company-1", "main-freelance", "sub"]),
});

export type Project = z.infer<typeof projectSchema>;
