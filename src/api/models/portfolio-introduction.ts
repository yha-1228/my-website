import { z } from "zod";

export const getPortfolioIntroductionResponseSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  body: z.string(),
  scope: z.string(),
  langAndFws: z.string(),
  tools: z.string(),
});

export type GetPortfolioIntroductionResponse = z.infer<
  typeof getPortfolioIntroductionResponseSchema
>;
