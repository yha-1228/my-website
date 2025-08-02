import { format, parseISO } from "date-fns";

export type DateTemplate = "yyyy年MM月dd日 HH:mm";

export function dateFormat(template: DateTemplate, dateInput: string) {
  const dateObj = parseISO(dateInput);
  return format(dateObj, template);
}
