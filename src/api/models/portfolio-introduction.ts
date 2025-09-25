import { z } from "zod";

export const getPortfolioIntroductionResponseSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  scope: z.string(),
  langAndFws: z.string(),
  tools: z.string(),
  // ---
  overview: z.string(),
  experience: z.string(),
  torikumi: z.string(),
  tsuyomi: z.string(),
  kongo: z.string(),
});

export type GetPortfolioIntroductionResponse = z.infer<
  typeof getPortfolioIntroductionResponseSchema
>;
