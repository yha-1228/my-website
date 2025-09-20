import {
  type GetPortfolioContentResponse,
  getPortfolioContentResponseSchema,
  type GetPortfolioContentsResponse,
  getPortfolioContentsResponseSchema,
} from "../models/portfolio-content";
import { client } from "./_microcms";

export async function getPortfolioContents(): Promise<GetPortfolioContentsResponse> {
  const response = await client.getList({ endpoint: "portfolio-contents" });

  return getPortfolioContentsResponseSchema.parse(response);
}

export async function getPortfolioContent(
  id: string,
): Promise<GetPortfolioContentResponse> {
  const response = await client.getListDetail({
    endpoint: "portfolio-contents",
    contentId: id,
  });

  return getPortfolioContentResponseSchema.parse(response);
}
