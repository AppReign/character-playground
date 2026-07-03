import type { ConfigImage, ConfigPart, Pose } from "../interfaces/Config";
import type { ZIndexLayerKey } from "../layers/zIndex";
import type { CharacterBasePartsVariant } from "../types/characterBaseParts";
import { buildCharacterBasePartCdnUrl } from "./characterBasePartCdnUrl";
import {
  deriveBaseArmBundlePoses,
  type EquipmentHandPose
} from "./equipmentPose";

const BODY_PART_TYPES = ["head", "body"] as const;

type LayerRow = { filename: string; layer: string };

function rowsToImages(
  partType: string,
  rows: LayerRow[] | undefined,
  variant: CharacterBasePartsVariant,
  cdnBaseUrl: string,
  cdnCacheBust?: string
): ConfigImage[] {
  return (rows ?? []).map((row) => ({
    filename: row.filename,
    layer: row.layer as ZIndexLayerKey,
    src: buildCharacterBasePartCdnUrl({
      gender: variant.gender,
      color: variant.color,
      partType,
      filename: row.filename,
      cdnBaseUrl,
      cacheBust: cdnCacheBust
    })
  }));
}

function configPartForBodyType(
  partType: (typeof BODY_PART_TYPES)[number],
  variant: CharacterBasePartsVariant,
  cdnBaseUrl: string,
  cdnCacheBust?: string
): ConfigPart | undefined {
  const rows = variant.parts?.[partType]?.all;
  if (!rows?.length) return undefined;
  return {
    name: `BASE ${partType.toUpperCase()} ${variant.id}`,
    pose: "all",
    images: rowsToImages(partType, rows, variant, cdnBaseUrl, cdnCacheBust)
  };
}

function configPartForArmPose(
  pose: Pose,
  variant: CharacterBasePartsVariant,
  cdnBaseUrl: string,
  cdnCacheBust?: string
): ConfigPart | undefined {
  const images = [
    ...rowsToImages("mainHand", variant.parts?.mainHand?.[pose], variant, cdnBaseUrl, cdnCacheBust),
    ...rowsToImages("offHand", variant.parts?.offHand?.[pose], variant, cdnBaseUrl, cdnCacheBust)
  ];
  if (!images.length) return undefined;
  return {
    name: `BASE ARMS ${pose} ${variant.id}`,
    pose,
    images
  };
}

/** Build playground {@link ConfigPart} rows from a hydrated API variant + current hand pose. */
export function resolveBasePartsFromVariant(
  variant: CharacterBasePartsVariant | undefined,
  handPose: EquipmentHandPose,
  cdnBaseUrl: string,
  cdnCacheBust?: string
): ConfigPart[] {
  if (!variant) return [];

  const parts: ConfigPart[] = [];
  for (const partType of BODY_PART_TYPES) {
    const part = configPartForBodyType(partType, variant, cdnBaseUrl, cdnCacheBust);
    if (part) parts.push(part);
  }

  const armBundles = deriveBaseArmBundlePoses(handPose);
  const armPoses: Pose[] =
    armBundles.mainHandPose === armBundles.offHandPose
      ? [armBundles.mainHandPose]
      : [armBundles.mainHandPose, armBundles.offHandPose];
  for (const pose of armPoses) {
    const part = configPartForArmPose(pose, variant, cdnBaseUrl, cdnCacheBust);
    if (part) parts.push(part);
  }

  return parts;
}
