import { EquipSlot } from "../config/equipSlots";
import { ConfigPartEquipment, Pose } from "../interfaces/Config";

/** Derived from equipped main/off hand weapons. */
export interface EquipmentHandPose {
  mainHandPose: Pose;
  offHandPose: Pose;
}

/**
 * Idle poses for empty hands after leaving 2h: **slot-based**, not weapon-complement.
 * — Main slot empty, off equipped → main idle `1h left`
 * — Off slot empty, main equipped → off idle `1h right`
 * — Both empty → `1h right` / `1h left` (initial pair)
 */
export function derivePoseFromEquipment(
  equipment: readonly ConfigPartEquipment[]
): EquipmentHandPose {
  const mainHand = equipment.find((p) => p.equipSlot === "mainHand");
  const offHand = equipment.find((p) => p.equipSlot === "offHand");
  const mainPose = mainHand?.pose ?? null;
  const offPose = offHand?.pose ?? null;
  const is2h = (p: Pose) => p === "2h" || p === "2h crossbow";
  if (mainPose && is2h(mainPose))
    return { mainHandPose: mainPose, offHandPose: mainPose };
  if (offPose && is2h(offPose))
    return { mainHandPose: offPose, offHandPose: offPose };
  return {
    mainHandPose:
      mainPose ?? (offPose != null ? "1h left" : "1h right"),
    offHandPose:
      offPose ?? (mainPose != null ? "1h right" : "1h left")
  };
}

export function partMatchesPose(
  p: ConfigPartEquipment,
  slot: EquipSlot,
  pose: EquipmentHandPose
): boolean {
  if (p.pose === "all") return true;
  if (slot === "mainHand") return p.pose === pose.mainHandPose;
  if (slot === "offHand") return p.pose === pose.offHandPose;
  return p.pose === pose.mainHandPose || p.pose === pose.offHandPose;
}

export function getEquipmentPartsForSlot(
  slot: EquipSlot,
  parts: ConfigPartEquipment[]
): ConfigPartEquipment[] {
  return parts.filter((p) => p.equipSlot === slot);
}

export function isTwoHandedWeaponPose(pose: Pose): boolean {
  return pose === "2h" || pose === "2h crossbow";
}
