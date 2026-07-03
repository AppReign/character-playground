import type {
  CharacterBasePartImageRef,
  CharacterBasePartsVariant
} from "../types/characterBaseParts";
import { buildCharacterBasePartCdnUrl } from "./characterBasePartCdnUrl";

export function extractBasePartImageRefs(
  variant: CharacterBasePartsVariant,
  cdnBaseUrl: string,
  cdnCacheBust?: string
): CharacterBasePartImageRef[] {
  const refs: CharacterBasePartImageRef[] = [];
  const parts = variant.parts ?? {};

  for (const [partType, poseBuckets] of Object.entries(parts)) {
    for (const [poseKey, rows] of Object.entries(poseBuckets ?? {})) {
      for (const row of rows ?? []) {
        if (!row?.filename) continue;
        refs.push({
          partType,
          poseKey,
          filename: row.filename,
          layer: row.layer,
          url: buildCharacterBasePartCdnUrl({
            gender: variant.gender,
            color: variant.color,
            partType,
            filename: row.filename,
            cdnBaseUrl,
            cacheBust: cdnCacheBust
          })
        });
      }
    }
  }

  return refs;
}
