import { format, parseISO } from "date-fns";

export type DateTemplate = "yyyy/MM/dd HH:mm:ss";

export function dateFormat(template: DateTemplate, dateInput: string) {
  const dateObj = parseISO(dateInput);
  return format(dateObj, template);
}
