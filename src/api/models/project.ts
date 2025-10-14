import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  roles: z.array(
    z.enum(["UIデザイン", "開発", "FE開発", "QA", "グラフィックデザイン"]),
  ),
  company: z.string().optional(),
  descriptionContent: z.string(),
  body: z.string().optional(),
  start: z.string(),
  end: z.string(),
  blank: z.string().optional(),
  structureAndRole: z.string().optional(),
  tools: z.string().optional(),
  langAndFws: z.string().optional(),
  isDraft: z.boolean().optional(),
  hasDesignPortfolio: z.boolean().optional(),
  type: z.enum(["main-company-1", "main-freelance", "sub"]),
  uxLayers: z.array(z.enum(["3.構造", "4.骨格", "5.表層"])),
  project: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
