import { EQUIPMENT } from "../../config/equipmentLayer";
import type { ItemEquip } from "../../interfaces/Config";

export const testEquipment = [
  {
    id: "test-crossbow-1h-left-mainhand",
    name: "1H CROSSBOW LEFT (TEST)",
    equipSlot: "main-hand",
    equipType: "crossbow",
    twoHanded: false,
    characterDisplay: {
      perSex: {
        male: {
          "1h left crossbow": [
            {
              filename: "M0_ONEHCBLSLING",
              layer: EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.UNDER
            },
            {
              filename: "M0_ONEHCBLBODY",
              layer: EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.OVER
            }
          ]
        }
      }
    }
  },
  {
    id: "test-crossbow-2h-mainhand",
    name: "2H CROSSBOW (TEST)",
    equipSlot: "main-hand",
    equipType: "crossbow",
    twoHanded: true,
    characterDisplay: {
      perSex: {
        male: {
          "2h crossbow": [
            {
              filename: "M0_TWOHCBSLING",
              layer: EQUIPMENT.MAINHAND.TWO_HANDED.CROSSBOW.UNDER
            },
            {
              filename: "M0_TWOHCBBODY",
              layer: EQUIPMENT.MAINHAND.TWO_HANDED.CROSSBOW.OVER
            }
          ]
        }
      }
    }
  },
  {
    id: "test-crossbow-1h-right-offhand",
    name: "1H CROSSBOW RIGHT (TEST)",
    equipSlot: "off-hand",
    equipType: "crossbow",
    twoHanded: false,
    characterDisplay: {
      perSex: {
        male: {
          "1h right crossbow": [
            {
              filename: "M0_ONEHCBRSLING",
              layer: EQUIPMENT.OFFHAND.ONE_HANDED.CROSSBOW.UNDER
            },
            {
              filename: "M0_ONEHCBRBODY",
              layer: EQUIPMENT.OFFHAND.ONE_HANDED.CROSSBOW.OVER
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
