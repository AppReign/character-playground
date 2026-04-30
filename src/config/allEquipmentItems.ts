import { ItemEquip } from "../interfaces/Config";
import { configPoc as crossbowsPoc } from "../equipment/testWeapons";
import { configPoc as plainFarmerPoc } from "../equipment/plainFarmer";
import { configPoc as mirayPoc } from "../equipment/miray";
import { configPoc as bassinianWarderPoc } from "../equipment/bassinianWarder";
import { configPoc as conquerorPoc } from "../equipment/conqueror";
import { buildEquipmentCatalog } from "./equipmentFromPoc";

/** Merged registry of all pose-keyed equipment definitions. */
export const equipmentPocRegistry: Record<string, ItemEquip> = {
  ...crossbowsPoc,
  ...plainFarmerPoc,
  ...mirayPoc,
  ...bassinianWarderPoc,
  ...conquerorPoc
};

/**
 * Full equipment catalog for the selector and merge-with-config (built from `configPoc` per set).
 */
const allEquipmentItems = buildEquipmentCatalog(equipmentPocRegistry);

export default allEquipmentItems;
