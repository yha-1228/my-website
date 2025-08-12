import {
  type SubmitHubspotFormRequestBody,
  type SubmitHubspotFormResponse,
  submitHubspotFormResponseSchema,
} from "../models/hubspot";

/**
 * @see https://developers.hubspot.jp/docs/reference/api/marketing/forms/v3-legacy
 */
export async function submitHubspotForm(
  portalId: string,
  formGuid: string,
  requestBody: SubmitHubspotFormRequestBody,
): Promise<SubmitHubspotFormResponse> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  let json;

  try {
    json = await response.json();
  } catch (error) {
    console.log(`JSON parse error`, (error as Error).message);
  }

  const parsedResponse = submitHubspotFormResponseSchema.safeParse(json);

  if (!parsedResponse.success) {
    console.log(`Zod error`, parsedResponse.error.message);
    throw new Error(`Parse error: ${parsedResponse.error.toString()}`);
  }

  return parsedResponse.data;
}
