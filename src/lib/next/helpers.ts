import { type AnyFunction } from "@/types/utils";

export const isPageError404 = (error: Error) => {
  return error.message === "fetch API response status: 404";
};

/**
 * サーバー・クライアント環境の前提で、クライアントのみで動作する前提の関数を
 * サーバーで万が一実行された場合にも代替値で対応して書く。
 *
 * @param func 関数
 * @param fallback サーバー環境だったときの代替値
 * @param params 関数の引数
 */
export function clientOnly<T extends AnyFunction, U>(
  func: T,
  fallback: U,
  ...params: Parameters<T>
): U | ReturnType<T> {
  return typeof window === "undefined"
    ? fallback
    : (func(...params) as ReturnType<T>);
}
