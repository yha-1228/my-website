import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<string | boolean | undefined>) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

type CxReturn<T extends string[]> = T extends []
  ? ""
  : T extends [infer Head extends string]
    ? Head
    : T extends [infer Head extends string, ...infer Tail extends string[]]
      ? `${Head} ${CxReturn<Tail>}`
      : string;

export function cx<T extends string[]>(...inputs: T) {
  return inputs.join(" ") as CxReturn<T>;
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
