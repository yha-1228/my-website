import { z } from "zod";

export const getPortfolioIntroductionLeftResponseSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  body: z.string(),
});

export type GetPortfolioIntroductionLeftResponse = z.infer<
  typeof getPortfolioIntroductionLeftResponseSchema
>;

export const getPortfolioIntroductionResponseSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  body: z.string(),
});

export type GetPortfolioIntroductionResponse = z.infer<
  typeof getPortfolioIntroductionResponseSchema
>;
