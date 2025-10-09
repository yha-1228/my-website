export function someIncludes<T>(array: T[], searchElements: T[]): boolean {
  return searchElements.some((el) => array.includes(el));
}
