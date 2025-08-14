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
