import { EQUIPMENT } from "../config/equipmentLayer";
import { ItemEquip } from "../interfaces/Config";

/** M02 - Plain Farmer armor/outfit set. Images in public/character_parts/plainFarmer/ */
const PREFIX = "plainFarmer/";

export const configPoc: Record<string, ItemEquip> = {
  "plain-farmer-chest-male": {
    id: "plain-farmer-chest-male",
    name: "PLAIN FARMER CHEST MALE",
    equipSlot: "chest",
    equipSet: "plainFarmer",
    images: {
      all: [
        {
          filename: PREFIX + "M02_CHESTOVER",
          layer: EQUIPMENT.CHEST.BODY.UNTUCKED
        }
      ],
      "1h left": [
        {
          filename: PREFIX + "M02_ONEHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
        }
      ],
      "1h right": [
        {
          filename: PREFIX + "M02_ONEHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
        }
      ],
      "2h": [
        {
          filename: PREFIX + "M02_TWOHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
        },
        {
          filename: PREFIX + "M02_TWOHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
        }
      ],
      "2h crossbow": [
        {
          filename: PREFIX + "M02_TWOHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
        },
        {
          filename: PREFIX + "M02_TWOHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
        }
      ],
      "1h left crossbow": [
        {
          filename: PREFIX + "M02_ONEHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "1h right crossbow": [
        {
          filename: PREFIX + "M02_ONEHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "throwing left": [
        {
          filename: PREFIX + "M02_ARMLTHROWING",
          layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
        }
      ],
      "throwing right": [
        {
          filename: PREFIX + "M02_ARMRTHROWING",
          layer: EQUIPMENT.CHEST.MAINHAND.THROWING
        }
      ]
    }
  },
  "plain-farmer-pants-male": {
    id: "plain-farmer-pants-male",
    name: "PLAIN FARMER PANTS MALE",
    equipSlot: "pants",
    equipSet: "plainFarmer",
    images: {
      all: [
        {
          filename: PREFIX + "M02_PANTSOVER",
          layer: EQUIPMENT.PANTS.UNTUCKED
        }
      ]
    }
  },
  "plain-farmer-foot-male": {
    id: "plain-farmer-foot-male",
    name: "PLAIN FARMER FOOT MALE",
    equipSlot: "boots",
    equipSet: "plainFarmer",
    images: {
      all: [
        {
          filename: PREFIX + "M02_FOOTUNDER",
          layer: EQUIPMENT.BOOTS.TUCKED
        }
      ]
    }
  }
};
