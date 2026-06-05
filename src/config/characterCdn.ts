const DEFAULT_CDN =
  "https://dotv-character-assets.nyc3.cdn.digitaloceanspaces.com";

export function getCharacterCdnBaseUrl(): string {
  const override = process.env.REACT_APP_CHARACTER_CDN_URL?.trim();
  return (override || DEFAULT_CDN).replace(/\/+$/, "");
}
