function keysOf<T extends object>(object: T): Array<keyof T> {
  const keys: Array<keyof T> = [];

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      keys.push(key);
    }
  }

  return keys;
}

export { keysOf };
