import {
  ConfigImage,
  ConfigPartEquipment,
  ItemEquip,
  ConfigPocImageRow,
  Pose
} from "../interfaces/Config";
import { zIndexValue } from "./zIndex";
import { EquipmentHandPose } from "../utils/equipmentPose";

function toConfigImage(row: Pick<ConfigPocImageRow, "filename" | "layer">): ConfigImage {
  return { filename: row.filename, zIndex: zIndexValue(row.layer) };
}

/**
 * True when this POC uses the hand-pose pipeline: non-empty `images.all` plus at
 * least one other `Pose` bucket (arm overlays, etc.). Single-bucket weapons
 * (only e.g. `1h right`) are excluded. Any `equipSlot` may use this shape.
 */
function isHandPoseKeyedPoc(poc: ItemEquip): boolean {
  if (!poc.images.all?.length) return false;
  return Object.keys(poc.images).some((k) => k !== "all");
}

/**
 * Base layers (`images.all`) plus pose-specific buckets for main-hand and
 * off-hand `Pose` keys, deduped by filename + z-order. Used for any equipment
 * POC that stores hand-dependent layers (chest, helm, gloves, …).
 */
export function resolvePocImagesForHandPose(
  poc: ItemEquip,
  pose: EquipmentHandPose
): ConfigImage[] {
  const out: ConfigImage[] = [];
  const seen = new Set<string>();
  const push = (layers?: ConfigPocImageRow[]) => {
    if (!layers) return;
    for (const row of layers) {
      const z = zIndexValue(row.layer);
      const key = `${row.filename}|${z}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ filename: row.filename, zIndex: z });
    }
  };
  push(poc.images.all);
  push(poc.images[pose.mainHandPose]);
  if (pose.offHandPose !== pose.mainHandPose) {
    push(poc.images[pose.offHandPose]);
  }
  return out;
}

/**
 * Pose for catalog matching and static `images` rows. Comes from the keys of
 * `poc.images`, not a separate field: each bucket is already keyed by pose.
 */
function derivePocCatalogPose(poc: ItemEquip): Pose {
  if (isHandPoseKeyedPoc(poc)) return "all";
  const nonEmpty = (
    Object.entries(poc.images) as [Pose, NonNullable<(typeof poc.images)[Pose]>][]
  ).filter(([, rows]) => rows?.length);
  if (nonEmpty.length === 0) return "all";
  if (nonEmpty.length === 1) return nonEmpty[0][0];
  const nonAll = nonEmpty.filter(([k]) => k !== "all");
  if (nonAll.length === 1) return nonAll[0][0];
  if (nonAll.length > 1) return nonAll[0][0];
  return "all";
}

function imagesForCatalogEntry(poc: ItemEquip): ConfigImage[] {
  if (isHandPoseKeyedPoc(poc)) {
    return (poc.images.all ?? []).map(toConfigImage);
  }
  const catalogPose = derivePocCatalogPose(poc);
  const poseLayers = poc.images[catalogPose];
  if (poseLayers?.length) {
    return poseLayers.map(toConfigImage);
  }
  if (poc.images.all?.length) {
    return poc.images.all.map(toConfigImage);
  }
  const first = Object.values(poc.images).find((v) => v?.length);
  return first ? first.map(toConfigImage) : [];
}

function catalogEntryFromPoc(
  key: string,
  poc: ItemEquip
): ConfigPartEquipment {
  const handPoseKeyed = isHandPoseKeyedPoc(poc);
  return {
    name: poc.name,
    equipSlot: poc.equipSlot,
    equipSet: poc.equipSet as ConfigPartEquipment["equipSet"],
    pose: derivePocCatalogPose(poc),
    images: imagesForCatalogEntry(poc),
    ...(poc.equipType !== undefined ? { equipType: poc.equipType } : {}),
    ...(poc.twoHanded !== undefined ? { twoHanded: poc.twoHanded } : {}),
    ...(handPoseKeyed ? { configPocKey: key } : {})
  };
}

export function buildEquipmentCatalog(
  registry: Record<string, ItemEquip>
): ConfigPartEquipment[] {
  return Object.entries(registry).map(([key, poc]) =>
    catalogEntryFromPoc(key, poc)
  );
}
