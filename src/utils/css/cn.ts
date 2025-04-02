import { twMerge } from "tailwind-merge";

export type ClassInput = string | boolean | undefined;

/**
 * クラス名を結合する (`twMerge`も織込み済み)
 */
export function cn(...inputs: ClassInput[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
