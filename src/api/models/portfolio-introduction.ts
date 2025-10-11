import { z } from "zod";

export const portfolioIntroductionSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  overviewDesign: z.string(),
  tsuyomiDesign: z.string(),
  kongoDesign: z.string(),
  overviewDev: z.string(),
});

export type PortfolioIntroduction = z.infer<typeof portfolioIntroductionSchema>;
