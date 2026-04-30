import { EQUIPMENT } from "../config/equipmentLayer";
import { ItemEquip } from "../interfaces/Config";

/** M04 - Bassinian Warder armor/outfit set. Images in public/character_parts/bassinianWarder/ */
const PREFIX = "bassinianWarder/";

export const configPoc: Record<string, ItemEquip> = {
  "bassinian-warder-helmet-male": {
    id: "bassinian-warder-helmet-male",
    name: "BASSINIAN WARDER HELMET MALE",
    equipSlot: "helm",
    equipSet: "bassinianWarder",
    images: {
      all: [
        {
          filename: PREFIX + "M04_HELMET",
          layer: EQUIPMENT.HELM
        },
        {
          filename: PREFIX + "M04_HAIROVER",
          layer: EQUIPMENT.HEAD.HAIR.OVER
        }
      ]
    }
  },
  "bassinian-warder-chest-male": {
    id: "bassinian-warder-chest-male",
    name: "BASSINIAN WARDER CHEST MALE",
    equipSlot: "chest",
    equipSet: "bassinianWarder",
    images: {
      all: [
        {
          filename: PREFIX + "M04_CHESTOVER",
          layer: EQUIPMENT.CHEST.BODY.UNTUCKED
        }
      ],
      "1h left": [
        {
          filename: PREFIX + "M04_ONEHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
        }
      ],
      "1h right": [
        {
          filename: PREFIX + "M04_ONEHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
        }
      ],
      "2h": [
        {
          filename: PREFIX + "M04_TWOHRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
        },
        {
          filename: PREFIX + "M04_TWOHLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
        }
      ],
      "2h crossbow": [
        {
          filename: PREFIX + "M04_TWOHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
        },
        {
          filename: PREFIX + "M04_TWOHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
        }
      ],
      "1h left crossbow": [
        {
          filename: PREFIX + "M04_ONEHCBLARM",
          layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "1h right crossbow": [
        {
          filename: PREFIX + "M04_ONEHCBRARM",
          layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
        }
      ],
      "throwing left": [
        {
          filename: PREFIX + "M04_ARMLTHROWING",
          layer: EQUIPMENT.CHEST.OFFHAND.THROWING
        }
      ],
      "throwing right": [
        {
          filename: PREFIX + "M04_ARMRTHROWING",
          layer: EQUIPMENT.CHEST.MAINHAND.THROWING
        }
      ]
    }
  },
  "bassinian-warder-pants-male": {
    id: "bassinian-warder-pants-male",
    name: "BASSINIAN WARDER PANTS MALE",
    equipSlot: "pants",
    equipSet: "bassinianWarder",
    images: {
      all: [
        {
          filename: PREFIX + "M04_PANTSOVER",
          layer: EQUIPMENT.PANTS.UNTUCKED
        }
      ]
    }
  },
  "bassinian-warder-weapon-1h-left": {
    id: "bassinian-warder-weapon-1h-left",
    name: "BASSINIAN WARDER 1H LEFT",
    equipSlot: "mainHand",
    equipType: "sword",
    twoHanded: false,
    equipSet: "bassinianWarder",
    images: {
      "1h left": [
        {
          filename: PREFIX + "M04_ONEHLWEAPON",
          layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
        }
      ]
    }
  },
  "bassinian-warder-foot-male": {
    id: "bassinian-warder-foot-male",
    name: "BASSINIAN WARDER FOOT MALE",
    equipSlot: "boots",
    equipSet: "bassinianWarder",
    images: {
      all: [
        {
          filename: PREFIX + "M04_FOOTUNDER",
          layer: EQUIPMENT.BOOTS.TUCKED
        }
      ]
    }
  }
};
