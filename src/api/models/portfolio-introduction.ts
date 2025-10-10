import { z } from "zod";

export const portfolioIntroductionSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  overview: z.string(),
  tsuyomi: z.string(),
  kongo: z.string(),
});

export type PortfolioIntroduction = z.infer<typeof portfolioIntroductionSchema>;
