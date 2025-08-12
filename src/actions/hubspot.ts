"use server";

import { submitHubspotForm as _submitHubspotForm } from "@/api/endpoints/hubspot";
import { type SubmitHubspotFormRequestBody } from "@/api/models/hubspot";

export async function submitHubspotForm(
  requestBody: SubmitHubspotFormRequestBody,
) {
  console.log(`process.env.HUBSPOT_PORTAL_ID!`, process.env.HUBSPOT_PORTAL_ID!);
  console.log(`process.env.HUBSPOT_FORM_GUID!`, process.env.HUBSPOT_FORM_GUID!);

  return _submitHubspotForm(
    process.env.HUBSPOT_PORTAL_ID!,
    process.env.HUBSPOT_FORM_GUID!,
    requestBody,
  );
}
