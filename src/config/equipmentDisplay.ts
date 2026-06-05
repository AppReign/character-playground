import {
  ConfigImage,
  ConfigPartEquipment,
  ItemEquip,
  CharacterDisplay,
  CharacterDisplayImageRow,
  Pose,
  CharacterSex
} from "../interfaces/Config";
import type { EquipmentSetBundle } from "../types/equipmentSet";
import type { EquipSlot } from "./equipSlots";
import {
  resolveEquipmentZIndex,
  supportsHandWeaponZIndex
} from "../layers/resolveEquipmentZIndex";
import {
  deriveChestSecondaryBucketPose,
  EquipmentHandPose
} from "../utils/equipmentPose";

/** Neutral idle pose for catalog previews (gloves z-index is hand-pose dependent). */
const CATALOG_PREVIEW_HAND_POSE: EquipmentHandPose = {
  mainHandPose: "1h mainhand",
  offHandPose: "1h offhand"
};

/** Slots that only use the {@code all} pose bucket (including hand weapons). */
const ALL_ONLY_SLOTS: readonly EquipSlot[] = [
  "helm",
  "boots",
  "pants",
  "gloves",
  "main-hand",
  "off-hand"
];

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

function isHandWeaponSlot(slot: EquipSlot | string): slot is "main-hand" | "off-hand" {
  return slot === "main-hand" || slot === "off-hand";
}

function filterResolvedImages(
  images: ({ filename: string; zIndex: number } | null)[]
): ConfigImage[] {
  return images.filter(
    (image): image is { filename: string; zIndex: number } => image != null
  );
}

function toConfigImage(
  item: ItemEquip,
  poseKey: Pose,
  row: CharacterDisplayImageRow,
  handPose?: EquipmentHandPose
): { filename: string; zIndex: number } | null {
  if (
    isHandWeaponSlot(item.equipSlot) &&
    !supportsHandWeaponZIndex(
      item.equipSlot,
      poseKey,
      row.layer,
      item.equipType,
      item.twoHanded
    )
  ) {
    return null;
  }

  const resolvedHandPose =
    item.equipSlot === "gloves" ? handPose ?? CATALOG_PREVIEW_HAND_POSE : handPose;

  return {
    filename: row.filename,
    zIndex: resolveEquipmentZIndex({
      equipSlot: item.equipSlot,
      poseKey,
      layer: row.layer,
      equipType: item.equipType,
      twoHanded: item.twoHanded,
      handPose: resolvedHandPose
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
    if (!image) continue;
    const key = `${image.filename}|${image.zIndex}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(image);
  }
}

function allBucketImages(
  item: ItemEquip,
  buckets: Partial<Record<Pose, CharacterDisplayImageRow[]>>,
  handPose?: EquipmentHandPose
): ConfigImage[] {
  const seen = new Set<string>();
  const out: { filename: string; zIndex: number }[] = [];
  pushBucketLayers(item, "all", buckets.all, handPose, seen, out);
  if (out.length) return out;
  const firstEntry = Object.entries(buckets).find(([, v]) => v?.length);
  if (!firstEntry) return [];
  const [poseKey, rows] = firstEntry as [Pose, CharacterDisplayImageRow[]];
  pushBucketLayers(item, poseKey, rows, handPose, seen, out);
  return out;
}

/**
 * Resolves drawable rows for the current hand pose.
 * — **Chest** composes `all` plus main- and off-hand stance buckets (arm variants).
 * — **Helm / pants / boots / gloves / main-hand / off-hand** use only the `all` bucket.
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
  const slot = item.equipSlot;

  if (ALL_ONLY_SLOTS.includes(slot)) {
    const handPose = slot === "gloves" ? pose : undefined;
    return allBucketImages(item, buckets, handPose);
  }

  const maleBuckets = getMalePoseBuckets(withDisplay);
  const def: Pose = maleBuckets.all?.length
    ? "all"
    : deriveCatalogPoseFromBuckets(maleBuckets);

  const seen = new Set<string>();
  const out: { filename: string; zIndex: number }[] = [];

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
  if (isHandWeaponSlot(item.equipSlot)) {
    return "all";
  }
  return deriveCatalogPoseFromBuckets(getMalePoseBuckets(item));
}

function imagesForCatalogEntry(
  item: ItemEquip & { characterDisplay: CharacterDisplay }
): ConfigImage[] {
  const buckets = getMalePoseBuckets(item);

  if (ALL_ONLY_SLOTS.includes(item.equipSlot)) {
    const handPose = item.equipSlot === "gloves" ? CATALOG_PREVIEW_HAND_POSE : undefined;
    return allBucketImages(item, buckets, handPose);
  }

  if (isHandPoseKeyedBuckets(buckets)) {
    return allBucketImages(item, buckets);
  }
  const catalogPose = deriveCatalogPose(item);
  const poseLayers = buckets[catalogPose];
  if (poseLayers?.length) {
    return filterResolvedImages(
      poseLayers.map((row) => toConfigImage(item, catalogPose, row))
    );
  }
  return allBucketImages(item, buckets);
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
