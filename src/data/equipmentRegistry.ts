import type { ItemEquip } from "../interfaces/Config";
import { bassinianWarderEquipment } from "./equipmentSets/bassinianWarder";
import { blessedGastoniaEquipment } from "./equipmentSets/blessedGastonia";
import { boltingFiddlerEquipment } from "./equipmentSets/boltingFiddler";
import { caligaeEquipment } from "./equipmentSets/caligae";
import { chandlerEquipment } from "./equipmentSets/chandler";
import { colossalCrusherclawEquipment } from "./equipmentSets/colossalCrusherclaw";
import { conquerorEquipment } from "./equipmentSets/conqueror";
import { cumberworldEquipment } from "./equipmentSets/cumberworld";
import { demonsbaneEquipment } from "./equipmentSets/demonsbane";
import { fanghunterEquipment } from "./equipmentSets/fanghunter";
import { graniteBlesserEquipment } from "./equipmentSets/graniteBlesser";
import { legacyEquipment } from "./equipmentSets/legacy";
import { longearesEquipment } from "./equipmentSets/longeares";
import { meftetEquipment } from "./equipmentSets/meftet";
import { mephiticChiffonEquipment } from "./equipmentSets/mephiticChiffon";
import { mirayEquipment } from "./equipmentSets/miray";
import { mordantMoswaEquipment } from "./equipmentSets/mordantMoswa";
import { naitourPatrolEquipment } from "./equipmentSets/naitourPatrol";
import { nonVanityEquipment } from "./equipmentSets/nonVanity";
import { plainFarmerEquipment } from "./equipmentSets/plainFarmer";
import { redDragonhunterEquipment } from "./equipmentSets/redDragonhunter";
import { scolfieldEquipment } from "./equipmentSets/scolfield";
import { sinderklazEquipment } from "./equipmentSets/sinderklaz";
import { sklirosEquipment } from "./equipmentSets/skliros";
import { spiderskinEquipment } from "./equipmentSets/spiderskin";
import { stormshapersEquipment } from "./equipmentSets/stormshapers";
import { sungLeatherEquipment } from "./equipmentSets/sungLeather";
import { thunderbirdEquipment } from "./equipmentSets/thunderbird";
import { veiledGriphornisEquipment } from "./equipmentSets/veiledGriphornis";
import { zaratanEquipment } from "./equipmentSets/zaratan";
import { testEquipment } from "./equipmentSets/test";

export type EquipmentSetBundle = {
  equipSet: string;
  items: readonly ItemEquip[];
};

const EQUIPMENT_SET_BUNDLES: readonly EquipmentSetBundle[] = [
  { equipSet: "bassinianWarder", items: bassinianWarderEquipment },
  { equipSet: "blessedGastonia", items: blessedGastoniaEquipment },
  { equipSet: "boltingFiddler", items: boltingFiddlerEquipment },
  { equipSet: "caligae", items: caligaeEquipment },
  { equipSet: "chandler", items: chandlerEquipment },
  { equipSet: "colossalCrusherclaw", items: colossalCrusherclawEquipment },
  { equipSet: "conqueror", items: conquerorEquipment },
  { equipSet: "cumberworld", items: cumberworldEquipment },
  { equipSet: "demonsbane", items: demonsbaneEquipment },
  { equipSet: "fanghunter", items: fanghunterEquipment },
  { equipSet: "graniteBlesser", items: graniteBlesserEquipment },
  { equipSet: "legacy", items: legacyEquipment },
  { equipSet: "longeares", items: longearesEquipment },
  { equipSet: "meftet", items: meftetEquipment },
  { equipSet: "mephiticChiffon", items: mephiticChiffonEquipment },
  { equipSet: "miray", items: mirayEquipment },
  { equipSet: "mordantMoswa", items: mordantMoswaEquipment },
  { equipSet: "naitourPatrol", items: naitourPatrolEquipment },
  { equipSet: "plainFarmer", items: plainFarmerEquipment },
  { equipSet: "redDragonhunter", items: redDragonhunterEquipment },
  { equipSet: "scolfield", items: scolfieldEquipment },
  { equipSet: "sinderklaz", items: sinderklazEquipment },
  { equipSet: "skliros", items: sklirosEquipment },
  { equipSet: "spiderskin", items: spiderskinEquipment },
  { equipSet: "stormshapers", items: stormshapersEquipment },
  { equipSet: "sungLeather", items: sungLeatherEquipment },
  { equipSet: "thunderbird", items: thunderbirdEquipment },
  { equipSet: "veiledGriphornis", items: veiledGriphornisEquipment },
  { equipSet: "zaratan", items: zaratanEquipment },
  { equipSet: "nonVanity", items: nonVanityEquipment },
  { equipSet: "test", items: testEquipment }
];

function mergeEquipmentSets(
  bundles: readonly EquipmentSetBundle[]
): Record<string, ItemEquip> {
  const out: Record<string, ItemEquip> = {};
  for (const { items } of bundles) {
    for (const item of items) {
      if (out[item.id]) {
        throw new Error(`Duplicate equipment id "${item.id}"`);
      }
      out[item.id] = item;
    }
  }
  return out;
}

/** All item definitions keyed by `id`. */
export const equipmentRegistry: Record<string, ItemEquip> =
  mergeEquipmentSets(EQUIPMENT_SET_BUNDLES);

/** Ordered bundles for building the drawable catalog (injects `equipSet` per bundle). */
export const equipmentSetBundles: readonly EquipmentSetBundle[] =
  EQUIPMENT_SET_BUNDLES;
