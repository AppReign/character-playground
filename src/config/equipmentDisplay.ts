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
import { zIndexValue } from "./zIndex";
import {
  deriveChestSecondaryBucketPose,
  EquipmentHandPose
} from "../utils/equipmentPose";

function toConfigImage(
  row: Pick<CharacterDisplayImageRow, "filename" | "layer">
): ConfigImage {
  return { filename: row.filename, zIndex: zIndexValue(row.layer) };
}

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

function pushUniqueLayers(
  layers: CharacterDisplayImageRow[] | undefined,
  seen: Set<string>,
  out: ConfigImage[]
): void {
  if (!layers?.length) return;
  for (const row of layers) {
    const z = zIndexValue(row.layer);
    const key = `${row.filename}|${z}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ filename: row.filename, zIndex: z });
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
  const out: ConfigImage[] = [];
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
    pushUniqueLayers(buckets.all, seen, out);
    if (out.length) return out;
    const first = Object.values(buckets).find((v) => v?.length);
    pushUniqueLayers(first, seen, out);
    return out;
  }

  if (slot === "main-hand") {
    pushUniqueLayers(buckets.all, seen, out);
    pushUniqueLayers(buckets[pose.mainHandPose] ?? buckets[def], seen, out);
    return out;
  }

  if (slot === "off-hand") {
    pushUniqueLayers(buckets.all, seen, out);
    pushUniqueLayers(buckets[pose.offHandPose] ?? buckets[def], seen, out);
    return out;
  }

  // Chest: stance-dependent overlays for both hands (second bucket may use complementary L/R
  // when both slots share the same `1h left` / `1h right` catalog pose).
  pushUniqueLayers(buckets.all, seen, out);
  pushUniqueLayers(buckets[pose.mainHandPose] ?? buckets[def], seen, out);
  pushUniqueLayers(
    buckets[deriveChestSecondaryBucketPose(pose)] ?? buckets[def],
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
    return (buckets.all ?? []).map(toConfigImage);
  }
  const catalogPose = deriveCatalogPose(item);
  const poseLayers = buckets[catalogPose];
  if (poseLayers?.length) {
    return poseLayers.map(toConfigImage);
  }
  if (buckets.all?.length) {
    return buckets.all.map(toConfigImage);
  }
  const first = Object.values(buckets).find((v) => v?.length);
  return first ? first.map(toConfigImage) : [];
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
    /** Always resolve layers from `equipmentRegistry` at render time when art exists. */
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
