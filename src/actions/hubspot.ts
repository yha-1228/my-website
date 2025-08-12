"use server";

import { z } from "zod";

import { submitHubspotForm as _submitHubspotForm } from "@/api/endpoints/hubspot";
import { type SubmitHubspotFormRequestBody } from "@/api/models/hubspot";

export async function submitHubspotForm(
  requestBody: SubmitHubspotFormRequestBody,
) {
  const portalId = z.string().min(1).parse(process.env.HUBSPOT_PORTAL_ID);
  const formGuid = z.string().min(1).parse(process.env.HUBSPOT_FORM_GUID);

  return _submitHubspotForm(portalId, formGuid, requestBody);
}
