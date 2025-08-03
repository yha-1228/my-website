export function fromEntries<K extends PropertyKey, V>(
  entries: Array<[K, V]>,
): Record<K, V> {
  const result: Partial<Record<K, V>> = {};

  for (const [key, value] of entries) {
    result[key] = value;
  }

  return result as Record<K, V>;
}

export function keysOf<T extends object>(object: T): Array<keyof T> {
  const keys: Array<keyof T> = [];

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      keys.push(key);
    }
  }

  return keys;
}

export function mapObject<T extends object, U>(
  object: T,
  condition: (value: T[keyof T], key: keyof T) => U,
) {
  const newObject: { [k in keyof T]?: U } = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      newObject[key] = condition(value, key);
    }
  }

  return newObject as { [k in keyof T]: U };
}

export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: Array<keyof T>,
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}
