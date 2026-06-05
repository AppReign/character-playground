import {
  ConfigImage,
  ConfigPartEquipment,
  ItemEquip,
  CharacterDisplay,
  CharacterDisplayImageRow,
  Pose,
  CharacterSex
} from "../interfaces/Config";
import type { EquipmentSetBundle } from "../data/equipmentRegistry";
import type { EquipSlot } from "./equipSlots";
import { resolveEquipmentZIndex } from "../layers/resolveEquipmentZIndex";
import {
  deriveChestSecondaryBucketPose,
  EquipmentHandPose
} from "../utils/equipmentPose";

const femaleFallbackWarned = new Set<string>();

function getMalePoseBuckets(
  item: ItemEquip & { characterDisplay: CharacterDisplay }
): Partial<Record<Pose, CharacterDisplayImageRow[]>> {
  const male = item.characterDisplay.perSex.male;
  if (!male || Object.keys(male).length === 0) {
    throw new Error(`Item "${item.id}" missing characterDisplay.perSex.male`);
  }
  return male;
}

function getPoseBuckets(
  item: ItemEquip & { characterDisplay: CharacterDisplay },
  sex: CharacterSex
): Partial<Record<Pose, CharacterDisplayImageRow[]>> {
  const male = item.characterDisplay.perSex.male;
  if (!male || Object.keys(male).length === 0) {
    throw new Error(`Item "${item.id}" missing characterDisplay.perSex.male`);
  }
  if (sex === "male") {
    return male;
  }
  const perSex = item.characterDisplay.perSex;
  const female =
    "female" in perSex ? perSex.female : undefined;
  if (female && Object.keys(female).length > 0) {
    return female;
  }
  if (!femaleFallbackWarned.has(item.id)) {
    console.warn(
      `[equipment] Item "${item.id}" has no female characterDisplay; using male layers until art is added.`
    );
    femaleFallbackWarned.add(item.id);
  }
  return male;
}

function isHandPoseKeyedBuckets(
  buckets: Partial<Record<Pose, CharacterDisplayImageRow[]>>
): boolean {
  if (!buckets.all?.length) return false;
  return Object.keys(buckets).some((k) => k !== "all");
}

function toConfigImage(
  item: ItemEquip,
  poseKey: Pose,
  row: CharacterDisplayImageRow,
  handPose?: EquipmentHandPose
): { filename: string; zIndex: number } {
  return {
    filename: row.filename,
    zIndex: resolveEquipmentZIndex({
      equipSlot: item.equipSlot,
      poseKey,
      layer: row.layer,
      equipType: item.equipType,
      twoHanded: item.twoHanded,
      handPose
    })
  };
}

function pushBucketLayers(
  item: ItemEquip,
  bucketPoseKey: Pose,
  layers: CharacterDisplayImageRow[] | undefined,
  handPose: EquipmentHandPose | undefined,
  seen: Set<string>,
  out: { filename: string; zIndex: number }[]
): void {
  if (!layers?.length) return;
  for (const row of layers) {
    const image = toConfigImage(item, bucketPoseKey, row, handPose);
    const key = `${image.filename}|${image.zIndex}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(image);
  }
}

/**
 * Resolves drawable rows for the current hand pose.
 * — **Chest** composes `all` plus main- and off-hand stance buckets (arm variants).
 * — **Helm / pants / boots / gloves / ring / mount** use only the `all` bucket (or the first non-empty bucket).
 * — **Main-hand / off-hand** use `all` plus the bucket for that hand’s pose only (no cross-hand merge).
 */
export function resolveEquipmentImagesForHandPose(
  item: ItemEquip,
  pose: EquipmentHandPose,
  sex: CharacterSex
): ConfigImage[] {
  if (!item.characterDisplay) {
    return [];
  }
  const withDisplay = item as ItemEquip & { characterDisplay: CharacterDisplay };
  const buckets = getPoseBuckets(withDisplay, sex);
  const maleBuckets = getMalePoseBuckets(withDisplay);
  const def: Pose = maleBuckets.all?.length
    ? "all"
    : deriveCatalogPoseFromBuckets(maleBuckets);

  const seen = new Set<string>();
  const out: { filename: string; zIndex: number }[] = [];
  const slot = item.equipSlot;

  const allOnlySlots: readonly EquipSlot[] = [
    "helm",
    "boots",
    "pants",
    "gloves",
    "ring",
    "mount"
  ];
  if (allOnlySlots.includes(slot)) {
    pushBucketLayers(item, "all", buckets.all, slot === "gloves" ? pose : undefined, seen, out);
    if (out.length) return out;
    const first = Object.values(buckets).find((v) => v?.length);
    const firstKey = (Object.entries(buckets).find(([, v]) => v?.length)?.[0] ?? "all") as Pose;
    pushBucketLayers(item, firstKey, first, slot === "gloves" ? pose : undefined, seen, out);
    return out;
  }

  if (slot === "main-hand") {
    pushBucketLayers(item, "all", buckets.all, pose, seen, out);
    const handPoseKey = (pose.mainHandPose in buckets ? pose.mainHandPose : def) as Pose;
    pushBucketLayers(item, handPoseKey, buckets[handPoseKey] ?? buckets[def], pose, seen, out);
    return out;
  }

  if (slot === "off-hand") {
    pushBucketLayers(item, "all", buckets.all, pose, seen, out);
    const handPoseKey = (pose.offHandPose in buckets ? pose.offHandPose : def) as Pose;
    pushBucketLayers(item, handPoseKey, buckets[handPoseKey] ?? buckets[def], pose, seen, out);
    return out;
  }

  pushBucketLayers(item, "all", buckets.all, pose, seen, out);
  pushBucketLayers(
    item,
    pose.mainHandPose,
    buckets[pose.mainHandPose] ?? buckets[def],
    pose,
    seen,
    out
  );
  pushBucketLayers(
    item,
    deriveChestSecondaryBucketPose(pose),
    buckets[deriveChestSecondaryBucketPose(pose)] ?? buckets[def],
    pose,
    seen,
    out
  );
  return out;
}

export function deriveCatalogPoseFromBuckets(
  buckets: Partial<Record<Pose, CharacterDisplayImageRow[]>>
): Pose {
  if (isHandPoseKeyedBuckets(buckets)) return "all";
  const nonEmpty = (
    Object.entries(buckets) as [Pose, NonNullable<(typeof buckets)[Pose]>][]
  ).filter(([, rows]) => rows?.length);
  if (nonEmpty.length === 0) return "all";
  if (nonEmpty.length === 1) return nonEmpty[0][0];
  const nonAll = nonEmpty.filter(([k]) => k !== "all");
  if (nonAll.length === 1) return nonAll[0][0];
  if (nonAll.length > 1) return nonAll[0][0];
  return "all";
}

function deriveCatalogPose(
  item: ItemEquip & { characterDisplay: CharacterDisplay }
): Pose {
  return deriveCatalogPoseFromBuckets(getMalePoseBuckets(item));
}

function imagesForCatalogEntry(
  item: ItemEquip & { characterDisplay: CharacterDisplay }
): ConfigImage[] {
  const buckets = getMalePoseBuckets(item);
  if (isHandPoseKeyedBuckets(buckets)) {
    return (buckets.all ?? []).map((row) => toConfigImage(item, "all", row));
  }
  const catalogPose = deriveCatalogPose(item);
  const poseLayers = buckets[catalogPose];
  if (poseLayers?.length) {
    return poseLayers.map((row) => toConfigImage(item, catalogPose, row));
  }
  if (buckets.all?.length) {
    return buckets.all.map((row) => toConfigImage(item, "all", row));
  }
  const firstEntry = Object.entries(buckets).find(([, v]) => v?.length);
  if (!firstEntry) return [];
  const [poseKey, rows] = firstEntry as [Pose, CharacterDisplayImageRow[]];
  return rows.map((row) => toConfigImage(item, poseKey, row));
}

function catalogEntryFromRegistryItem(
  registryKey: string,
  item: ItemEquip & { characterDisplay: CharacterDisplay },
  equipSet: string
): ConfigPartEquipment {
  return {
    name: item.name,
    equipSlot: item.equipSlot,
    equipSet,
    pose: deriveCatalogPose(item),
    images: imagesForCatalogEntry(item),
    ...(item.equipType !== undefined ? { equipType: item.equipType } : {}),
    ...(item.twoHanded !== undefined ? { twoHanded: item.twoHanded } : {}),
    equipmentRegistryKey: registryKey
  };
}

export function buildEquipmentCatalog(
  bundles: readonly EquipmentSetBundle[]
): ConfigPartEquipment[] {
  const out: ConfigPartEquipment[] = [];
  for (const { equipSet, items } of bundles) {
    for (const item of items) {
      if (!item.characterDisplay) continue;
      out.push(
        catalogEntryFromRegistryItem(
          item.id,
          item as ItemEquip & { characterDisplay: CharacterDisplay },
          equipSet
        )
      );
    }
  }
  return out;
}
