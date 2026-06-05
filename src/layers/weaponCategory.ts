import type { Pose } from "../interfaces/Config";

export type WeaponCategory =
  | "default-1h"
  | "2h"
  | "crossbow-1h"
  | "crossbow-2h"
  | "shield";

const SHIELD_TYPES = new Set([
  "buckler-shield",
  "medium-shield",
  "tower-shield"
]);

/**
 * Weapon stacking category. Hand weapons use {@code poseKey=all} only; category comes from
 * {@code equipType} and {@code twoHanded}. Chest/gloves may still pass stance pose keys.
 */
export function weaponCategory(
  equipType: string | undefined,
  poseKey: Pose,
  twoHanded?: boolean
): WeaponCategory {
  const type = (equipType ?? "").toLowerCase();
  const useItemFlagsOnly = poseKey === "all";

  if (SHIELD_TYPES.has(type)) {
    return "shield";
  }

  if (type === "crossbow") {
    if (twoHanded || (!useItemFlagsOnly && poseKey === "2h crossbow")) {
      return "crossbow-2h";
    }
    return "crossbow-1h";
  }

  if (twoHanded || (!useItemFlagsOnly && (poseKey === "2h" || poseKey === "2h crossbow"))) {
    return "2h";
  }

  return "default-1h";
}
