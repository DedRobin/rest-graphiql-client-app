export function updateURLInBrowser(url: string) {
  window.history.pushState({}, "", url);
}
