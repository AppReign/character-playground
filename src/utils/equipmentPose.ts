import { EquipSlot } from "../config/equipSlots";
import { ConfigPartEquipment, Pose } from "../interfaces/Config";

export type EquipmentHandPose = {
  mainHandPose: Pose;
  offHandPose: Pose;
};

/**
 * Idle poses when a slot is empty. Must match art: chest `"1h left"` = OFFHAND-side layers,
 * `"1h right"` = MAINHAND-side layers. Many main-hand weapons (incl. 1h crossbows) use **left**
 * stance keys (`1h left`, `1h left crossbow`); off-hand gear often uses **right** keys — so main
 * idle is left, off idle is right (not the reverse).
 */
const DEFAULT_MAIN_HAND_EMPTY: Pose = "1h left";
const DEFAULT_OFF_HAND_EMPTY: Pose = "1h right";

export type BodySide = "left" | "right" | "both";

/** Which side of the body a pose key drives for base arms + chest buckets (see `partsBaseArms`). */
export function anatomicalSideOfPose(p: Pose): BodySide {
  if (p === "2h" || p === "2h crossbow") return "both";
  if (
    p === "1h left" ||
    p === "1h left crossbow" ||
    p === "throwing left"
  ) {
    return "left";
  }
  if (
    p === "1h right" ||
    p === "1h right crossbow" ||
    p === "throwing right"
  ) {
    return "right";
  }
  return "left";
}

export function isTwoHandedWeaponPose(pose: Pose): boolean {
  return pose === "2h" || pose === "2h crossbow";
}

/** Base `partsBaseArms` entries for neutral one-hand stances — one pose key per side (L vs R). */
export function isLeftRightIdlePair(p: Pose): boolean {
  return p === "1h left" || p === "1h right";
}

export function complementaryLeftRightIdle(p: Pose): Pose {
  return p === "1h left" ? "1h right" : "1h left";
}

function weaponOccupiesBothHands(part: ConfigPartEquipment): boolean {
  return (
    part.twoHanded === true || isTwoHandedWeaponPose(part.pose)
  );
}

/**
 * Derives the pose pair used for registry hand resolution from currently equipped weapons.
 * Empty main → {@link DEFAULT_MAIN_HAND_EMPTY} (`1h left`); empty off → {@link DEFAULT_OFF_HAND_EMPTY}
 * (`1h right`). A two-handed main-hand weapon mirrors its pose into the off slot when empty.
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
 * anatomical side (same-hand collision), the second bundle uses the opposite idle (`1h left` ↔
 * `1h right`). Item resolution still uses truthful {@link derivePoseFromEquipment}.
 */
export function deriveBaseArmBundlePoses(
  pose: EquipmentHandPose
): readonly [Pose, Pose] {
  const { mainHandPose, offHandPose } = pose;
  const sm = anatomicalSideOfPose(mainHandPose);
  const so = anatomicalSideOfPose(offHandPose);

  if (sm === "both" || so === "both") {
    return [mainHandPose, offHandPose];
  }

  if (sm === so) {
    return [mainHandPose, sm === "left" ? "1h right" : "1h left"];
  }

  return [mainHandPose, offHandPose];
}

/** Second stance bucket for chest armor (paired with `mainHandPose` first push). */
export function deriveChestSecondaryBucketPose(pose: EquipmentHandPose): Pose {
  const sm = anatomicalSideOfPose(pose.mainHandPose);
  const so = anatomicalSideOfPose(pose.offHandPose);

  if (sm === "both" || so === "both") {
    return pose.offHandPose;
  }

  if (sm !== so) {
    return pose.offHandPose;
  }

  return sm === "left" ? "1h right" : "1h left";
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
