export interface SendHubSpotFormRequest {
  fields: Array<{
    objectTypeId: string;
    value: string;
    name: string;
  }>;
}

export async function sendHubspotForm(request: SendHubSpotFormRequest) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/${process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const json = await response.json();
  return json as { inlineMessage: string };
}
