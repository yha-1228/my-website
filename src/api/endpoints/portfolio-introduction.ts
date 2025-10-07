import {
  type PortfolioIntroduction,
  portfolioIntroductionSchema,
} from "../models/portfolio-introduction";
import { client } from "./_microcms";

export async function getPortfolioIntroduction(): Promise<PortfolioIntroduction> {
  const response = await client.getObject({
    endpoint: "portfolio-introduction",
  });

  return portfolioIntroductionSchema.parse(response);
}
