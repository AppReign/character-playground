/** Clears the `#` share payload from the current URL. */
export function cleanCharacterUrlHash(): void {
  window.location.href = window.location.href.split("#")[0] + "#";
}
