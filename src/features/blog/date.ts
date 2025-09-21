import { addHours, format, parseISO } from "date-fns";

export type DateTemplate = "yyyy年MM月dd日 HH:mm";

export function dateFormat(template: DateTemplate, dateInput: string) {
  let dateObj = parseISO(dateInput);

  // デプロイ後だと9時間後ろにずれるので対処する
  if (process.env.NODE_ENV === "production") {
    dateObj = addHours(dateObj, 9);
  }

  return format(dateObj, template);
}
