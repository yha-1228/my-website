import { z } from "zod";

export const submitHubspotFormRequestSchema = z.object({
  path: z.object({
    hubspotPortalId: z.string(),
    hubspotFormId: z.string(),
  }),
  body: z.object({
    fields: z.array(
      z.object({
        objectTypeId: z.string(),
        value: z.string(),
        name: z.string(),
      }),
    ),
  }),
});

export type SubmitHubspotFormRequest = z.infer<
  typeof submitHubspotFormRequestSchema
>;

export const submitHubspotFormResponseSchema = z.object({
  redirectUri: z.string().optional(),
  inlineMessage: z.string().optional(),
  errors: z.any(),
});

export type SubmitHubspotFormResponse = z.infer<
  typeof submitHubspotFormResponseSchema
>;
