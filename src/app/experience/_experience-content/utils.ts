export function splitText(text: unknown, limit: number) {
  const items = String(text)
    .split(",")
    .map((item) => item.trim());

  if (items.length <= limit) {
    return { texts: items, isOver: false };
  }

  return { texts: [...items.slice(0, limit)], isOver: true };
}

/**
 * カンマ区切りのテキストを指定した数だけ表示し、超過分は「"etc."」で省略します。
 *
 * @param {} text - カンマ区切りのテキスト、または配列やその他の値。
 * @param {number} limit - 表示する項目数の上限。
 */
export function ellipsisTextByComma(text: unknown, limit: number): string {
  const items = String(text)
    .split(",")
    .map((item) => item.trim());

  if (items.length <= limit) {
    return items.join(", ");
  }

  return [...items.slice(0, limit), "etc."].join(", ");
}
