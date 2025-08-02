import {
  type SubmitHubspotFormRequestBody,
  type SubmitHubspotFormResponse,
  submitHubspotFormResponseSchema,
} from "../validation/hubspot";

/**
 * @see https://developers.hubspot.jp/docs/reference/api/marketing/forms/v3-legacy
 */
export async function submitHubspotForm(
  portalId: string,
  formGuid: string,
  requestBody: SubmitHubspotFormRequestBody,
): Promise<SubmitHubspotFormResponse> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const json = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const parsedResponse = submitHubspotFormResponseSchema.safeParse(json);

  if (!parsedResponse.success) {
    throw new Error(`Parse error: ${parsedResponse.error.toString()}`);
  }

  return parsedResponse.data;
}
