import { format, parseISO } from "date-fns";

type DateTemplate = "yyyy/MM/dd HH:mm:ss";

function dateFormat(template: DateTemplate, dateInput: string) {
  const dateObj = parseISO(dateInput);
  return format(dateObj, template);
}

export { dateFormat, type DateTemplate };
