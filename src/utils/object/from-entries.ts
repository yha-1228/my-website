function fromEntries<K extends PropertyKey, V>(
  entries: Array<[K, V]>,
): Record<K, V> {
  const result: Partial<Record<K, V>> = {};

  for (const [key, value] of entries) {
    result[key] = value;
  }

  return result as Record<K, V>;
}

export { fromEntries };
