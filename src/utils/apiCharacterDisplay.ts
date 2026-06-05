import type { EquipSlot } from "../config/equipSlots";
import { getCharacterCdnBaseUrl } from "../config/characterCdn";
import type { ItemEquip } from "../interfaces/Config";
import type { ApiCharacterDisplay } from "../services/creatorEquipmentApi";
import { isVanityItem, type ApiItemEquipment } from "../types/apiItemEquipment";
import type { ExtractedImageRef } from "./extractCharacterDisplayImages";

export type CreatorEquipmentItem = {
  id: string;
  name: string;
  equipSlot: string;
  equipType?: string;
  twoHanded?: boolean;
  imagePath?: string;
  vanitySet: string;
  itemSetIds?: string[];
  itemSetSegment: string;
  normalizedItemId: string;
  characterDisplay?: ApiCharacterDisplay | null;
};

/** Adapter: batch API item → `ItemEquip` shape used by validation and playground helpers. */
export function creatorItemToItemEquip(item: CreatorEquipmentItem): ItemEquip {
  const characterDisplay = item.characterDisplay
    ? {
        perSex: {
          male: item.characterDisplay.male ?? {},
          ...(item.characterDisplay.female
            ? { female: item.characterDisplay.female }
            : {})
        }
      }
    : undefined;

  return {
    id: item.id,
    name: item.name,
    equipSlot: item.equipSlot as EquipSlot,
    ...(item.equipType ? { equipType: item.equipType } : {}),
    ...(item.twoHanded !== undefined ? { twoHanded: item.twoHanded } : {}),
    ...(item.imagePath ? { imagePath: item.imagePath } : {}),
    ...(characterDisplay ? { characterDisplay: characterDisplay as ItemEquip["characterDisplay"] } : {})
  };
}

export function apiItemToCreatorItem(item: ApiItemEquipment): CreatorEquipmentItem | null {
  if (!item.id?.startsWith("e.")) {
    return null;
  }
  const vanity = item.vanity;
  if (!isVanityItem(vanity) || !vanity?.vanitySet) {
    return null;
  }
  if (!item.characterDisplay) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    equipSlot: item.equipSlot,
    equipType: item.equipType,
    twoHanded: item.twoHanded,
    imagePath: item.imagePath,
    vanitySet: vanity.vanitySet,
    itemSetIds: item.itemSetIds,
    normalizedItemId: item.id.replace(/^e\./, ""),
    itemSetSegment: resolveItemSetSegment(item),
    characterDisplay: item.characterDisplay
  };
}

export function extractRefsFromApiCharacterDisplay(
  display: ApiCharacterDisplay | null | undefined
): ExtractedImageRef[] {
  if (!display) return [];
  const out: ExtractedImageRef[] = [];
  pushApiBuckets(out, display.male, "male");
  pushApiBuckets(out, display.female, "female");
  return out;
}

function pushApiBuckets(
  out: ExtractedImageRef[],
  buckets: Record<string, { filename: string; layer: string }[]> | undefined,
  sex: "male" | "female"
): void {
  if (!buckets) return;
  for (const poseKey of Object.keys(buckets)) {
    const rows = buckets[poseKey];
    if (!rows?.length) continue;
    for (const row of rows) {
      out.push({
        filename: row.filename,
        poseKey,
        sex,
        layer: String(row.layer)
      });
    }
  }
}

export function resolveItemSetSegment(item: ApiItemEquipment): string {
  const itemSetIds = item.itemSetIds;
  const vanitySet = item.vanity?.vanitySet;

  if (itemSetIds?.length === 1) {
    return normalizeItemSetSegment(itemSetIds[0]);
  }
  if (vanitySet) {
    return normalizeItemSetSegment(vanitySet);
  }
  return "standalone";
}

function normalizeItemSetSegment(segment: string): string {
  const trimmed = segment.trim();
  const withoutPrefix = trimmed.startsWith("is.") ? trimmed.slice(3) : trimmed;
  return withoutPrefix.toLowerCase();
}

export function buildEquipmentCdnUrl(
  item: Pick<CreatorEquipmentItem, "itemSetSegment" | "normalizedItemId">,
  ref: Pick<ExtractedImageRef, "filename" | "sex">,
  cdnBaseUrl: string = getCharacterCdnBaseUrl()
): string {
  const base = cdnBaseUrl.replace(/\/+$/, "");
  const filename = ref.filename.endsWith(".png") ? ref.filename : `${ref.filename}.png`;
  const objectKey = [
    "equipment",
    item.itemSetSegment,
    item.normalizedItemId,
    ref.sex,
    filename
  ].join("/");
  return `${base}/${objectKey}`;
}
