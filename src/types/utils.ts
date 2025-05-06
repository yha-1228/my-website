export type DistributiveOmit<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends keyof any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = T extends any ? Omit<T, K> : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<T = any> = (...args: any[]) => T;

export type RecordCanBooleanKey<K, T> = K extends boolean
  ? Record<"true" | "false", T>
  : K extends PropertyKey
    ? Record<K, T>
    : never;

export type Replace<T, U extends { [key in keyof T]?: unknown }> = Omit<
  T,
  keyof U
> &
  U;
