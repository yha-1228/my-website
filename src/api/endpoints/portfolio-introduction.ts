import {
  type GetPortfolioIntroductionLeftResponse,
  getPortfolioIntroductionLeftResponseSchema,
  type GetPortfolioIntroductionResponse,
  getPortfolioIntroductionResponseSchema,
} from "../models/portfolio-introduction";
import { client } from "./_microcms";

export async function getPortfolioIntroductionLeft(): Promise<GetPortfolioIntroductionLeftResponse> {
  const response = await client.getObject({
    endpoint: "portfolio-introduction-left",
  });

  return getPortfolioIntroductionLeftResponseSchema.parse(response);
}

export async function getPortfolioIntroduction(): Promise<GetPortfolioIntroductionResponse> {
  const response = await client.getObject({
    endpoint: "portfolio-introduction",
  });

  return getPortfolioIntroductionResponseSchema.parse(response);
}
