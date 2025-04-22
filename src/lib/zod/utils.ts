import { type SafeParseReturnType } from "zod";

import { mapObject, omit } from "@/utils/object";

export function getKeyErrorMessagesMap<Input>(
  safeParseReturn: SafeParseReturnType<Input, Input>,
): { [key in keyof Input]?: string[] } {
  const formattedError = safeParseReturn.error?.format();
  if (!formattedError) return {};

  const errors = mapObject(omit(formattedError, ["_errors"]), (value) => {
    if ("_errors" in value) {
      // @ts-expect-error TODO: fix
      return value._errors as string[];
    } else {
      return undefined;
    }
  });

  return errors as { [key in keyof Input]?: string[] };
}

export function getKeyErrorMessageMap<Input>(
  safeParseReturn: SafeParseReturnType<Input, Input>,
): { [key in keyof Input]?: string } {
  const keyErrorMessagesMap = getKeyErrorMessagesMap(safeParseReturn);
  return mapObject(keyErrorMessagesMap, (errorMessages) => errorMessages?.[0]);
}
