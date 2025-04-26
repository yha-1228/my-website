"use server";

import { submitHubspotForm as _submitHubspotForm } from "@/api/clients/hubspot";
import {
  type SubmitHubspotFormRequest,
  type SubmitHubspotFormResponse,
} from "@/api/validation/hubspot";

export async function submitHubspotForm(
  request: SubmitHubspotFormRequest["body"],
): Promise<SubmitHubspotFormResponse> {
  return _submitHubspotForm({
    path: {
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID,
      hubspotFormId: process.env.HUBSPOT_FORM_ID,
    },
    body: request,
  });
}
