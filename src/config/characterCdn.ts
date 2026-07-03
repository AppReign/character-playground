const DEFAULT_CDN =
  "https://dotv-character-assets.nyc3.cdn.digitaloceanspaces.com";

export function getCharacterCdnBaseUrl(): string {
  const override = process.env.REACT_APP_CHARACTER_CDN_URL?.trim();
  return (override || DEFAULT_CDN).replace(/\/+$/, "");
}

/** Appends a cache-busting query param so CDN edges fetch the latest object after re-upload. */
export function appendCharacterCdnCacheBust(url: string, cacheBust?: string): string {
  if (!cacheBust) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}uuid=${encodeURIComponent(cacheBust)}`;
}
