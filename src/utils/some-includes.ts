export function someIncludes<T extends string>(
  array: T[],
  searchElements: T[],
): boolean {
  return searchElements.some((el) => array.includes(el));
}
