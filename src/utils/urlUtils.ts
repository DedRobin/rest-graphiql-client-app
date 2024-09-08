export function updateUrlInBrowser(url: string) {
  window.history.pushState({}, "", url);
}
