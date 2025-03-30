"use server";

import {
  sendNetlifyForm as _sendNetlifyForm,
  type SendNetlifyFormParams,
} from "@/api/clients/utils";

export function sendNetlifyForm(params: SendNetlifyFormParams) {
  return _sendNetlifyForm(params);
}
