function fromEntries<K extends PropertyKey, V>(
  entries: Array<[K, V]>,
): { [key in K]: V } {
  const result: { [key in K]?: V } = {};

  for (const [key, value] of entries) {
    result[key] = value;
  }

  return result as { [key in K]: V };
}

export { fromEntries };
