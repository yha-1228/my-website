import { createClient } from "microcms-js-sdk";
import { env } from "@/env";

/**
 * @see https://document.microcms.io/tutorial/next/next-getting-started
 */
export const client = createClient({
  serviceDomain: env.SERVICE_DOMAIN,
  apiKey: env.API_KEY,
});
