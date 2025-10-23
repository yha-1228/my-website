import {
  addHours,
  format,
  isWithinInterval,
  parseISO,
  subMonths,
} from "date-fns";

export type DateTemplate = "yyyy年MM月dd日 HH:mm";

export function dateFormat(
  template: DateTemplate,
  dateInput: string,
  { isServer } = { isServer: false },
) {
  let dateObj = parseISO(dateInput);

  // デプロイ後だと9時間後ろにずれるので対処する
  if (isServer) {
    if (process.env.NODE_ENV === "production") {
      dateObj = addHours(dateObj, 9);
    }
  }

  return format(dateObj, template);
}

/**
 * `targetDateISO`が`baseDate`から一ヶ月以内かどうか判定する。
 */
export function isWithinOneMonth(targetDateISO: string, baseDate = new Date()) {
  const targetDate = new Date(targetDateISO);

  return isWithinInterval(targetDate, {
    start: subMonths(baseDate, 1),
    end: baseDate,
  });
}
