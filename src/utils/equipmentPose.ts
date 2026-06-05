import { EquipSlot } from "../config/equipSlots";
import { ConfigPartEquipment, Pose } from "../interfaces/Config";

export type EquipmentHandPose = {
  mainHandPose: Pose;
  offHandPose: Pose;
};

const DEFAULT_MAIN_HAND_EMPTY: Pose = "1h mainhand";
const DEFAULT_OFF_HAND_EMPTY: Pose = "1h offhand";

export type HandPoseBucket = "mainhand" | "offhand" | "both";

/** Which hand bucket a pose key drives for base arms + chest overlays. */
export function handPoseBucketOf(p: Pose): HandPoseBucket {
  if (p === "2h" || p === "2h crossbow") return "both";
  if (
    p === "1h mainhand" ||
    p === "1h mainhand crossbow" ||
    p === "throwing mainhand"
  ) {
    return "mainhand";
  }
  if (
    p === "1h offhand" ||
    p === "1h offhand crossbow" ||
    p === "throwing offhand"
  ) {
    return "offhand";
  }
  return "mainhand";
}

export function isTwoHandedWeaponPose(pose: Pose): boolean {
  return pose === "2h" || pose === "2h crossbow";
}

/** Base `partsBaseArms` entries for neutral one-hand stances — one pose key per hand. */
export function isOneHandIdlePair(p: Pose): boolean {
  return p === "1h mainhand" || p === "1h offhand";
}

export function complementaryOneHandIdle(p: Pose): Pose {
  return p === "1h mainhand" ? "1h offhand" : "1h mainhand";
}

/** True when the item’s pose or flag indicates it uses both hands (2h / 2h crossbow). */
export function weaponOccupiesBothHands(part: ConfigPartEquipment): boolean {
  return (
    part.twoHanded === true || isTwoHandedWeaponPose(part.pose)
  );
}

/**
 * Derives the pose pair used for registry hand resolution from currently equipped weapons.
 * Empty main → `1h mainhand`; empty off → `1h offhand`. A two-handed main-hand weapon mirrors
 * its pose into the off slot when empty.
 */
export function derivePoseFromEquipment(
  equipment: ConfigPartEquipment[]
): EquipmentHandPose {
  const mainHand = equipment.find((p) => p.equipSlot === "main-hand");
  const offHand = equipment.find((p) => p.equipSlot === "off-hand");
  const mainPose = mainHand?.pose;
  const offPose = offHand?.pose;

  let mainHandPose: Pose = mainPose ?? DEFAULT_MAIN_HAND_EMPTY;
  let offHandPose: Pose = offPose ?? DEFAULT_OFF_HAND_EMPTY;

  if (
    mainHand != null &&
    offHand == null &&
    weaponOccupiesBothHands(mainHand)
  ) {
    offHandPose = mainHand.pose;
  }

  return { mainHandPose, offHandPose };
}

/**
 * Two pose keys for {@link getBaseCharacterAssets}. If both slot poses map to the **same**
 * hand bucket (collision), the second bundle uses the opposite idle (`1h mainhand` ↔ `1h offhand`).
 * Item resolution still uses truthful {@link derivePoseFromEquipment}.
 */
export function deriveBaseArmBundlePoses(
  pose: EquipmentHandPose
): readonly [Pose, Pose] {
  const { mainHandPose, offHandPose } = pose;
  const sm = handPoseBucketOf(mainHandPose);
  const so = handPoseBucketOf(offHandPose);

  if (sm === "both" || so === "both") {
    return [mainHandPose, offHandPose];
  }

  if (sm === so) {
    return [mainHandPose, complementaryOneHandIdle(mainHandPose)];
  }

  return [mainHandPose, offHandPose];
}

/** Second stance bucket for chest armor (paired with `mainHandPose` first push). */
export function deriveChestSecondaryBucketPose(pose: EquipmentHandPose): Pose {
  const sm = handPoseBucketOf(pose.mainHandPose);
  const so = handPoseBucketOf(pose.offHandPose);

  if (sm === "both" || so === "both") {
    return pose.offHandPose;
  }

  if (sm !== so) {
    return pose.offHandPose;
  }

  return complementaryOneHandIdle(pose.mainHandPose);
}

/**
 * Whether `p` should appear in the slot list for the current hand-derived pose.
 * Hand slots list every catalog option in that slot (native catalog `pose` may differ from the
 * default derived pose when nothing is equipped). Armor uses `"all"` or stance-specific poses.
 */
export function partMatchesPose(
  p: ConfigPartEquipment,
  slot: EquipSlot,
  pose: EquipmentHandPose
): boolean {
  if (slot === "main-hand" || slot === "off-hand") {
    return true;
  }
  if (p.pose === "all") return true;
  return p.pose === pose.mainHandPose || p.pose === pose.offHandPose;
}

export function getEquipmentPartsForSlot(
  slot: EquipSlot,
  catalog: ConfigPartEquipment[],
  equipped: ConfigPartEquipment[]
): ConfigPartEquipment[] {
  const handPose = derivePoseFromEquipment(equipped);
  return catalog.filter(
    (p) => p.equipSlot === slot && partMatchesPose(p, slot, handPose)
  );
}
