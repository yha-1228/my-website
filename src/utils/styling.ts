import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<string | boolean | undefined>) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export function getCSSVar(property: `--${string}`): string {
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue(property);
}

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
