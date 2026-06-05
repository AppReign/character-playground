import type { CharacterSex, ConfigImage, ConfigPartEquipment, ItemEquip } from "../interfaces/Config";
import type { EquipmentHandPose } from "../utils/equipmentPose";
import { resolveEquipmentImagesForHandPose } from "../config/equipmentDisplay";
import {
  buildEquipmentCdnUrl,
  type CreatorEquipmentItem
} from "./apiCharacterDisplay";

export function attachCdnToConfigImages(
  images: ConfigImage[],
  creatorItem: CreatorEquipmentItem,
  sex: CharacterSex,
  cdnBaseUrl: string
): ConfigImage[] {
  return images.map((image) => ({
    ...image,
    src: buildEquipmentCdnUrl(
      creatorItem,
      { filename: image.filename, sex },
      cdnBaseUrl
    )
  }));
}

export function resolveEquipmentImagesWithCdn(
  item: ItemEquip,
  creatorItem: CreatorEquipmentItem,
  pose: EquipmentHandPose,
  sex: CharacterSex,
  cdnBaseUrl: string
): ConfigImage[] {
  const images = resolveEquipmentImagesForHandPose(item, pose, sex);
  return attachCdnToConfigImages(images, creatorItem, sex, cdnBaseUrl);
}

export function catalogWithCdnUrls(
  catalog: ConfigPartEquipment[],
  itemById: Record<string, CreatorEquipmentItem>,
  cdnBaseUrl: string,
  sex: CharacterSex = "male"
): ConfigPartEquipment[] {
  return catalog.map((part) => {
    const key = part.equipmentRegistryKey;
    const creatorItem = key ? itemById[key] : undefined;
    if (!creatorItem || !part.images?.length) {
      return part;
    }
    return {
      ...part,
      images: attachCdnToConfigImages(part.images, creatorItem, sex, cdnBaseUrl)
    };
  });
}

export function itemEquipByIdFromBundles(
  bundles: readonly { items: readonly ItemEquip[] }[]
): Record<string, ItemEquip> {
  const out: Record<string, ItemEquip> = {};
  for (const bundle of bundles) {
    for (const item of bundle.items) {
      out[item.id] = item;
    }
  }
  return out;
}
