import type { ItemEquip } from "../interfaces/Config";
import {
  equipmentRegistry as equipmentRegistryData,
  equipmentSetBundles
} from "../data/equipmentRegistry";
import { buildEquipmentCatalog } from "./equipmentDisplay";

/** Merged registry of all equipment definitions (`src/data/equipmentRegistry.ts`). */
export const equipmentRegistry: Record<string, ItemEquip> = equipmentRegistryData;

/**
 * Drawable equipment catalog for the selector and merge-with-config
 * (items without `characterDisplay` are omitted until art is added).
 */
const allEquipmentItems = buildEquipmentCatalog([...equipmentSetBundles]);

export default allEquipmentItems;
