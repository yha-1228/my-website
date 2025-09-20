import { createClient } from "microcms-js-sdk";
import { z } from "zod";

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
export const client = createClient({
  serviceDomain: z.string().parse(process.env.SERVICE_DOMAIN),
  apiKey: z.string().parse(process.env.API_KEY),
});
