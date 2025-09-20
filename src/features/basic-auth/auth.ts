export function generateLogoutUrl() {
  const url = new URL(window.location.href);
  url.username = "logout";
  return url.toString().replace(/\/$/, "");
}
