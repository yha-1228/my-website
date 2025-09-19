import { createClient } from "microcms-js-sdk";
import { z } from "zod";

import {
  type GetPortfolioContentResponse,
  getPortfolioContentResponseSchema,
  type GetPortfolioContentsResponse,
  getPortfolioContentsResponseSchema,
} from "../models/portfolio-content";

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
const _client = createClient({
  serviceDomain: z.string().parse(process.env.SERVICE_DOMAIN),
  apiKey: z.string().parse(process.env.API_KEY),
});

export async function getPortfolioContents(): Promise<GetPortfolioContentsResponse> {
  const response = await _client.getList({ endpoint: "portfolio-contents" });

  return getPortfolioContentsResponseSchema.parse(response);
}

export async function getPortfolioContent(
  id: string,
): Promise<GetPortfolioContentResponse> {
  const response = await _client.getListDetail({
    endpoint: "portfolio-contents",
    contentId: id,
  });

  return getPortfolioContentResponseSchema.parse(response);
}
