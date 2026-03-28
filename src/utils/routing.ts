export function createSearchString(input: object) {
  const queries = Object.entries(input)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return queries ? `?${queries}` : "";
}
