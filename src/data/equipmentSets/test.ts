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
          "1h mainhand crossbow": [
            {
              filename: "M0_ONEHCBLSLING",
              layer: "under"
            },
            {
              filename: "M0_ONEHCBLBODY",
              layer: "over"
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
              layer: "under"
            },
            {
              filename: "M0_TWOHCBBODY",
              layer: "over"
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
          "1h offhand crossbow": [
            {
              filename: "M0_ONEHCBRSLING",
              layer: "under"
            },
            {
              filename: "M0_ONEHCBRBODY",
              layer: "over"
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
