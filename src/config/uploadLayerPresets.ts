/** Sprite stack layer per equip slot — matches server `EquipmentCharacterDisplayLayerCatalog`. */
export const BASE_LAYER_PRESETS = ["base"] as const;

export const OVER_UNDER_LAYER_PRESETS = ["over", "under"] as const;

export function layerPresetsForEquipSlot(equipSlot: string): readonly string[] {
  switch (equipSlot) {
    case "chest":
    case "pants":
    case "helm":
    case "boots":
      return BASE_LAYER_PRESETS;
    case "main-hand":
    case "off-hand":
    case "gloves":
      return OVER_UNDER_LAYER_PRESETS;
    default:
      return BASE_LAYER_PRESETS;
  }
}
