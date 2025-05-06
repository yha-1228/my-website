import { type Replace } from "@/types/utils";

import { NotOkResponseError } from "../error";

type CustomRequestInit = Replace<
  RequestInit,
  { method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" }
>;

export async function customFetch(input: string, init: CustomRequestInit) {
  const response = await fetch(input, init);
  const json = await response.json();

  if (!response.ok) {
    const error = new NotOkResponseError(
      init.method,
      input,
      response.status,
      json,
    );
    console.log(error.message);
    throw error;
  }

  return json;
}
