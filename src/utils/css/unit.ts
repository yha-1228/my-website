export function remToPx(rem: string | number, withUnit: true): `${string}px`;
export function remToPx(rem: string | number, withUnit: false): number;
export function remToPx(rem: string | number): number;
export function remToPx(
  rem: string | number,
  withUnit?: boolean,
): string | number {
  const value = (typeof rem === "number" ? rem : parseFloat(rem)) * 16;
  return withUnit ? `${value}px` : value;
}
