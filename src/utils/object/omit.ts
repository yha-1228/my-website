function omit<T extends object, K extends string>(
  object: T,
  keys: Array<keyof T>,
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

export { omit };
