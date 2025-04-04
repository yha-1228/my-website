import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合する (`twMerge`も織込み済み)
 */
function cn(...inputs: Array<string | boolean | undefined>) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export { cn };
