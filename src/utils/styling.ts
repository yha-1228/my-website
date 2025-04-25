import { twMerge } from "tailwind-merge";

import { type RecordCanBooleanKey } from "@/types/utils";

export function cn(...inputs: Array<string | boolean | undefined>) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export type VariantsConfig<TVariantsProps> = {
  [K in keyof Required<TVariantsProps>]: Required<TVariantsProps>[K] extends
    | string
    | boolean
    ? RecordCanBooleanKey<Required<TVariantsProps>[K], string>
    : never;
};

export function classVariants<TVariantsProps>(
  common: string,
  config: VariantsConfig<TVariantsProps>,
) {
  return function (variants: Required<TVariantsProps>) {
    // e.g.
    // visual: {
    //   fill: "bg-blue",
    //   outline: "bordered-blue",
    // }
    //
    // value: visual
    // variant[key]: "fill"
    // --> visual class: visual["fill"] --> "bg-blue"

    const classInputs = Object.entries(config).map(
      // @ts-expect-error ...
      ([key, value]) => value[variants[key]],
    );
    return cn(common, ...classInputs);
  };
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
