"use server";

import { submitHubspotForm as _submitHubspotForm } from "@/api/endpoints/hubspot";
import { type SubmitHubspotFormRequestBody } from "@/api/models/hubspot";

export async function submitHubspotForm(
  requestBody: SubmitHubspotFormRequestBody,
) {
  return _submitHubspotForm(
    process.env.HUBSPOT_PORTAL_ID!,
    process.env.HUBSPOT_FORM_GUID!,
    requestBody,
  );
}
