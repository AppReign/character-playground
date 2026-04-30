import { EQUIPMENT } from "../config/equipmentLayer";
import { ItemEquip } from "../interfaces/Config";

/** M03 - Miray armor/outfit set. Images in public/character_parts/miray/ */
const PREFIX = "miray/";

export const configPoc: Record<string, ItemEquip> = {
  "miray-helmet-male": {
    id: "miray-helmet-male",
    name: "MIRAY HELMET MALE",
    equipSlot: "helm",
    equipSet: "miray",
    images: {
      all: [
        {
          filename: PREFIX + "M03_HELMET",
          layer: EQUIPMENT.HELM
        }
      ]
    }
  },
  "miray-chest-male": {
    id: "miray-chest-male",
    name: "MIRAY CHEST MALE",
    equipSlot: "chest",
    equipSet: "miray",
    images: {
      all: [
        {
          filename: PREFIX + "M03_CHESTUNDER",
          layer: EQUIPMENT.CHEST.BODY.TUCKED
        }
      ],
      "1h left": [
        {
          filename: PREFIX + "M03_ONEHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
        },
      ],
      "1h right": [
        {
          filename: PREFIX + "M03_ONEHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
        },
      ],
      "2h": [
        {
          filename: PREFIX + "M03_TWOHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
        },
        {
          filename: PREFIX + "M03_TWOHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
        }
      ],
      "2h crossbow": [
        {
          filename: PREFIX + "M03_TWOHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
        },
        {
          filename: PREFIX + "M03_TWOHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
        }
      ],
      "1h left crossbow": [
        {
          filename: PREFIX + "M03_ONEHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "1h right crossbow": [
        {
          filename: PREFIX + "M03_ONEHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "throwing left": [
        {
          filename: PREFIX + "M03_ARMLTHROWING",
          layer: EQUIPMENT.CHEST.OFFHAND.THROWING
        }
      ],
      "throwing right": [
        {
          filename: PREFIX + "M03_ARMRTHROWING",
          layer: EQUIPMENT.CHEST.MAINHAND.THROWING
        }
      ]
    }
  },
  "miray-pants-male": {
    id: "miray-pants-male",
    name: "MIRAY PANTS MALE",
    equipSlot: "pants",
    equipSet: "miray",
    images: {
      all: [
        {
          filename: PREFIX + "M03_PANTS",
          layer: EQUIPMENT.PANTS.UNTUCKED
        }
      ]
    }
  },
  "miray-weapon-1h-left-male": {
    id: "miray-weapon-1h-left-male",
    name: "MIRAY LANCE 1H LEFT",
    equipSlot: "mainHand",
    equipType: "polearm",
    twoHanded: false,
    equipSet: "miray",
    images: {
      "1h left": [
        {
          filename: PREFIX + "M03_ONEHLWEAPON",
          layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
        }
      ]
    }
  },
  "miray-foot-male": {
    id: "miray-foot-male",
    name: "MIRAY FOOT MALE",
    equipSlot: "boots",
    equipSet: "miray",
    images: {
      all: [
        {
          filename: PREFIX + "M03_FOOTUNDER",
          layer: EQUIPMENT.BOOTS.UNTUCKED
        }
      ]
    }
  },
  "miray-shield-male": {
    id: "miray-shield-male",
    name: "SHIELD",
    equipSlot: "offHand",
    equipType: "medium-shield",
    twoHanded: false,
    equipSet: "miray",
    images: {
      all: [
        {
          filename: PREFIX + "M03_RSHIELD",
          layer: EQUIPMENT.OFFHAND.ONE_HANDED.SHIELD.UNDER
        }
      ]
    }
  }
};
