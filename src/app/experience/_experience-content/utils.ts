export function includesMany<T>(array: T[], searchElements: T[]) {
  return searchElements.every((searchElement) => array.includes(searchElement));
}
