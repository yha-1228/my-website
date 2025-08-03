import { z } from "zod";

export const submitHubspotFormRequestBodySchema = z.object({
  fields: z.array(
    z.object({
      objectTypeId: z.string(),
      value: z.string(),
      name: z.string(),
    }),
  ),
});

export type SubmitHubspotFormRequestBody = z.infer<
  typeof submitHubspotFormRequestBodySchema
>;

export const submitHubspotFormResponseSchema = z.object({
  redirectUri: z.string().optional(),
  inlineMessage: z.string().optional(),
  errors: z.any(),
});

export type SubmitHubspotFormResponse = z.infer<
  typeof submitHubspotFormResponseSchema
>;
