import { EQUIPMENT } from "../config/equipmentLayer";
import { ItemEquip } from "../interfaces/Config";

/** M05 - Conqueror armor/outfit set. Images in public/character_parts/conqueror/ */
const PREFIX = "conqueror/";

export const configPoc: Record<string, ItemEquip> = {
  "conqueror-helmet-male": {
    id: "conqueror-helmet-male",
    name: "CONQUEROR HELMET MALE",
    equipSlot: "helm",
    equipSet: "conqueror",
    images: {
      all: [
        {
          filename: PREFIX + "M05_HELMET",
          layer: EQUIPMENT.HELM
        }
      ]
    }
  },
  "conqueror-chest-male": {
    id: "conqueror-chest-male",
    name: "CONQUEROR CHEST MALE",
    equipSlot: "chest",
    equipSet: "conqueror",
    images: {
      all: [
        {
          filename: PREFIX + "M05_CHESTOVER",
          layer: EQUIPMENT.CHEST.BODY.UNTUCKED
        }
      ],
      "1h left": [
        {
          filename: PREFIX + "M05_ONEHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
        }
      ],
      "1h right": [
        {
          filename: PREFIX + "M05_ONEHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
        }
      ],
      "2h": [
        {
          filename: PREFIX + "M05_TWOHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
        },
        {
          filename: PREFIX + "M05_TWOHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
        }
      ],
      "2h crossbow": [
        {
          filename: PREFIX + "M05_TWOHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
        },
        {
          filename: PREFIX + "M05_TWOHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
        }
      ],
      "1h left crossbow": [
        {
          filename: PREFIX + "M05_ONEHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "1h right crossbow": [
        {
          filename: PREFIX + "M05_ONEHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "throwing left": [
        {
          filename: PREFIX + "M05_ARMLTHROWING",
          layer: EQUIPMENT.CHEST.OFFHAND.THROWING
        }
      ],
      "throwing right": [
        {
          filename: PREFIX + "M05_ARMRTHROWING",
          layer: EQUIPMENT.CHEST.MAINHAND.THROWING
        }
      ]
    }
  },
  "conqueror-pants-male": {
    id: "conqueror-pants-male",
    name: "CONQUEROR PANTS MALE",
    equipSlot: "pants",
    equipSet: "conqueror",
    images: {
      all: [
        {
          filename: PREFIX + "M05_PANTS",
          layer: EQUIPMENT.PANTS.UNTUCKED
        }
      ]
    }
  },
  "conqueror-weapon-1h-left": {
    id: "conqueror-weapon-1h-left",
    name: "CONQUEROR WEAPON 1H LEFT",
    equipSlot: "mainHand",
    equipType: "sword",
    twoHanded: false,
    equipSet: "conqueror",
    images: {
      "1h left": [
        {
          filename: PREFIX + "M05_ONEHLWEAPON",
          layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
        }
      ]
    }
  },
  "conqueror-foot-male": {
    id: "conqueror-foot-male",
    name: "CONQUEROR FOOT MALE",
    equipSlot: "boots",
    equipSet: "conqueror",
    images: {
      all: [
        {
          filename: PREFIX + "M05_FOOTUNDER",
          layer: EQUIPMENT.BOOTS.TUCKED
        }
      ]
    }
  }
};
