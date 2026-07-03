import { appendCharacterCdnCacheBust } from "../config/characterCdn";
import type { CreatorEquipmentItem } from "./apiCharacterDisplay";
import { poseKeyToSlug } from "./poseKeySlug";

function layerToSlug(layer: string): string {
  return layer.trim().toLowerCase();
}

/** Expected CDN filename (matches dotv `EquipmentCharacterImagePathBuilder`). */
export function buildEquipmentUploadFilename(
  normalizedItemId: string,
  gender: string,
  poseKey: string,
  layer: string
): string {
  const genderSegment = gender.trim().toLowerCase();
  return `${normalizedItemId}-${poseKeyToSlug(poseKey)}-${layerToSlug(layer)}-${genderSegment}.png`;
}

/** Expected object key under the character CDN bucket. */
export function buildEquipmentUploadObjectKey(
  item: Pick<CreatorEquipmentItem, "itemSetSegment" | "normalizedItemId">,
  gender: string,
  poseKey: string,
  layer: string
): string {
  const filename = buildEquipmentUploadFilename(
    item.normalizedItemId,
    gender,
    poseKey,
    layer
  );
  const genderSegment = gender.trim().toLowerCase();
  return [
    "equipment",
    item.itemSetSegment,
    item.normalizedItemId,
    genderSegment,
    filename
  ].join("/");
}

export function buildEquipmentUploadCdnUrl(
  item: Pick<CreatorEquipmentItem, "itemSetSegment" | "normalizedItemId">,
  gender: string,
  poseKey: string,
  layer: string,
  cdnBaseUrl: string,
  cacheBust?: string
): string {
  const base = cdnBaseUrl.replace(/\/+$/, "");
  const url = `${base}/${buildEquipmentUploadObjectKey(item, gender, poseKey, layer)}`;
  return appendCharacterCdnCacheBust(url, cacheBust);
}
