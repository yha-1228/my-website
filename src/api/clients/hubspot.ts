import {
  type SubmitHubspotFormRequest,
  type SubmitHubspotFormResponse,
  submitHubspotFormResponseSchema,
} from "../validation/hubspot";
import { customFetch } from "./common";

/**
 * @see https://developers.hubspot.jp/docs/reference/api/marketing/forms/v3-legacy
 */
export async function submitHubspotForm(
  request: SubmitHubspotFormRequest,
): Promise<SubmitHubspotFormResponse> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${request.path.hubspotPortalId}/${request.path.hubspotFormId}`;

  const json = await customFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request.body),
  });

  const parsedResponse = submitHubspotFormResponseSchema.safeParse(json);

  if (!parsedResponse.success) {
    throw new Error(`Parse error: ${parsedResponse.error.toString()}`);
  }

  return parsedResponse.data;
}
