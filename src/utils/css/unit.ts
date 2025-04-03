export function remToPx(rem: string, withUnit: true): string;
export function remToPx(rem: string, withUnit: false): number;
export function remToPx(rem: string): number;
export function remToPx(rem: string, withUnit?: boolean): string | number {
  const value = parseFloat(rem) * 16;
  return withUnit ? `${value}px` : value;
}
