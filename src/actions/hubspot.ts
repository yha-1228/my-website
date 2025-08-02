"use server";

import { z } from "zod";

import { submitHubspotForm as _submitHubspotForm } from "@/api/clients/hubspot";
import {
  type SubmitHubspotFormRequestBody,
  type SubmitHubspotFormResponse,
} from "@/api/validation/hubspot";

export async function submitHubspotForm(
  requestBody: SubmitHubspotFormRequestBody,
): Promise<SubmitHubspotFormResponse> {
  const portalId = z.string().min(1).parse(process.env.HUBSPOT_PORTAL_ID);
  const formGuid = z.string().min(1).parse(process.env.HUBSPOT_FORM_GUID);

  return _submitHubspotForm(portalId, formGuid, requestBody);
}
