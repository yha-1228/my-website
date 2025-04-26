import { NotOkResponseError } from "../error";
import {
  type SubmitHubspotFormRequest,
  type SubmitHubspotFormResponse,
  submitHubspotFormResponseSchema,
} from "../validation/hubspot";

/**
 * @see https://developers.hubspot.jp/docs/reference/api/marketing/forms/v3-legacy
 */
export async function submitHubspotForm(
  request: SubmitHubspotFormRequest,
): Promise<SubmitHubspotFormResponse> {
  const method = "POST";
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${request.path.hubspotPortalId}/${request.path.hubspotFormId}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request.body),
  });

  const json = await response.json();

  if (!response.ok) {
    const error = new NotOkResponseError(method, url, response.status, json);
    console.log(error.message);
    throw error;
  }

  const parsedResponse = submitHubspotFormResponseSchema.safeParse(json);

  if (!parsedResponse.success) {
    throw new Error(`Parse error: ${parsedResponse.error.toString()}`);
  }

  return parsedResponse.data;
}
