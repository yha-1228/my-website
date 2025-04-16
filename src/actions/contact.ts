"use server";

import {
  sendNetlifyForm as _sendNetlifyForm,
  type SendNetlifyFormParams,
} from "@/api/clients/netlify";

export function sendNetlifyForm(params: SendNetlifyFormParams) {
  return _sendNetlifyForm(params);
}
