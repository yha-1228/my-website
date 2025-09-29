/**
 * カンマ区切りのテキストを指定した数だけ表示し、超過分は「等」で省略します。
 *
 * @param {unknown} text - カンマ区切りのテキスト、または配列やその他の値。
 * @param {number} limit - 表示する項目数の上限。
 * @returns {string} 省略後のテキスト。
 *
 * @example
 * ellipsisTextByComma("React,Vue,Angular,Svelte", 2);
 * // => "React, Vue, 等"
 *
 * @example
 * ellipsisTextByComma("React,Vue", 3);
 * // => "React, Vue"
 *
 * @example
 * ellipsisTextByComma(undefined, 2);
 * // => ""
 */
export function ellipsisTextByComma(text: unknown, limit: number): string {
  const items = String(text)
    .split(",")
    .map((item) => item.trim());

  if (items.length <= limit) {
    return items.join(", ");
  }

  return [...items.slice(0, limit), "等"].join(", ");
}
