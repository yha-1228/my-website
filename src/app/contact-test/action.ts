"use server";

import { submitHubspotForm } from "@/api/endpoints/hubspot";

export type FormState = { ok: true } | { ok: false; error: string };

export async function sendContactAction(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = {
    fullname: formData.get("fullname")! as string,
    email: formData.get("email")! as string,
    company: formData.get("company")! as string,
    message: formData.get("message")! as string,
  };
  console.log(`values`, values);

  try {
    const result = await submitHubspotForm(
      process.env.HUBSPOT_PORTAL_ID!,
      process.env.HUBSPOT_FORM_GUID!,
      {
        fields: [
          {
            objectTypeId: "0-1",
            name: "fullname",
            value: values.fullname,
          },
          {
            objectTypeId: "0-1",
            name: "email",
            value: values.email,
          },
          {
            objectTypeId: "0-1",
            name: "company",
            value: values.company,
          },
          {
            objectTypeId: "0-1",
            name: "message",
            value: values.message,
          },
        ],
      },
    );

    console.log(`result`, result);

    if ("status" in result && result.status === "error") {
      return {
        ok: false,
        error: "失敗しました。",
      };
    }

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      error: "失敗しました。",
    };
  }
}
