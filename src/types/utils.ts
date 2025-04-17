export type ValueOf<T> = T[keyof T];

export type DistributiveOmit<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends keyof any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = T extends any ? Omit<T, K> : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<T = any> = (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAsyncFunction = AnyFunction<Promise<any>>;
