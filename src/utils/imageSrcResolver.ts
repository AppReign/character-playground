import { ConfigImage } from "../interfaces/Config";
import { getCharacterPartPublicUrl } from "./characterPartUrl";

/**
 * Resolve the image URL for rendering. Uses image.src if set (e.g. from require()),
 * otherwise builds public URL: character_parts / filename .png
 * (filename may include subpath, e.g. conqueror/M05_HELMET).
 */
export function getImageSrc(image: ConfigImage): string {
  if (image.src) return image.src;
  return getCharacterPartPublicUrl(image.filename);
}
