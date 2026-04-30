import { EQUIPMENT } from "../config/equipmentLayer";
import { ItemEquip } from "../interfaces/Config";

/** Generic held crossbow weapons (test set). */

export const configPoc: Record<string, ItemEquip> = {
  "test-crossbow-1h-left-mainhand": {
    id: "test-crossbow-1h-left-mainhand",
    name: "1H CROSSBOW LEFT",
    equipSlot: "mainHand",
    equipType: "crossbow",
    twoHanded: false,
    equipSet: "test",
    images: {
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
  },
  "test-crossbow-1h-right-offhand": {
    id: "test-crossbow-1h-right-offhand",
    name: "1H CROSSBOW RIGHT",
    equipSlot: "offHand",
    equipType: "crossbow",
    twoHanded: false,
    equipSet: "test",
    images: {
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
  },
  "test-crossbow-2h-mainhand": {
    id: "test-crossbow-2h-mainhand",
    name: "2H CROSSBOW",
    equipSlot: "mainHand",
    equipType: "crossbow",
    twoHanded: true,
    equipSet: "test",
    images: {
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
};
