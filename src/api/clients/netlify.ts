import { encode } from "@/lib/netlify/encode";

export interface SendNetlifyFormParams {
  htmlFilepath: string;
  formName: string;
  data: Record<string, string>;
}

/**
 * @see https://docs.netlify.com/frameworks/next-js/overview/#netlify-forms-compatibility
 */
export async function sendNetlifyForm(params: SendNetlifyFormParams) {
  const { htmlFilepath, formName, data } = params;
  const res = await fetch(htmlFilepath, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, ...data }),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res;
}
