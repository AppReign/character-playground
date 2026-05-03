/**
 * Public URL for a drawable under `public/character_parts/` (matches {@link getImageSrc}).
 */
export function getCharacterPartPublicUrl(filename: string): string {
  const prefix = `${process.env.PUBLIC_URL || ""}/character_parts`;
  return `${prefix}/${filename}.png`;
}
