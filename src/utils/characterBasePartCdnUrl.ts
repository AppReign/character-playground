import {
  appendCharacterCdnCacheBust,
  getCharacterCdnBaseUrl
} from "../config/characterCdn";

export type BuildCharacterBasePartCdnUrlParams = {
  gender: string;
  color: string;
  partType: string;
  filename: string;
  cdnBaseUrl?: string;
  cacheBust?: string;
};

export function buildCharacterBasePartCdnUrl({
  gender,
  color,
  partType,
  filename,
  cdnBaseUrl = getCharacterCdnBaseUrl(),
  cacheBust
}: BuildCharacterBasePartCdnUrlParams): string {
  const base = cdnBaseUrl.replace(/\/+$/, "");
  const normalizedFilename = filename.endsWith(".png") ? filename : `${filename}.png`;
  const segments = [
    "character",
    gender.trim().toLowerCase(),
    color.trim().toLowerCase(),
    partType,
    normalizedFilename
  ];
  return appendCharacterCdnCacheBust(`${base}/${segments.join("/")}`, cacheBust);
}
