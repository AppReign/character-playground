import type { EquipSlot } from "./equipSlots";

/** All weapon-stance pose keys (chest, gloves, etc.) — matches server `FULL_POSE_KEYS`. */
export const FULL_POSE_KEYS = [
  "all",
  "1h mainhand",
  "1h offhand",
  "2h",
  "2h crossbow",
  "1h mainhand crossbow",
  "1h offhand crossbow",
  "throwing mainhand",
  "throwing offhand"
] as const;

const ALL_ONLY_POSE_KEYS = ["all"] as const;

const POSE_KEYS_BY_SLOT: Partial<Record<EquipSlot, readonly string[]>> = {
  chest: FULL_POSE_KEYS,
  gloves: FULL_POSE_KEYS,
  helm: ALL_ONLY_POSE_KEYS,
  pants: ALL_ONLY_POSE_KEYS,
  boots: ALL_ONLY_POSE_KEYS,
  "main-hand": ALL_ONLY_POSE_KEYS,
  "off-hand": ALL_ONLY_POSE_KEYS
};

export function poseKeysForEquipSlot(equipSlot: EquipSlot | string): readonly string[] {
  return POSE_KEYS_BY_SLOT[equipSlot as EquipSlot] ?? ALL_ONLY_POSE_KEYS;
}
