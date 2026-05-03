import type { ItemEquip } from "../../interfaces/Config";
import { EQUIPMENT } from "../../config/equipmentLayer";

const BW = "bassinianWarder/";

/** Vanity set `bassinian-warder` — `equipSet` for catalog grouping: `bassinianWarder` (file `bassinianWarder.ts`). */
export const bassinianWarderEquipment = [
  {
    id: "e.bassinian-warder-breeches",
    name: "Bassinian Warder Breeches",
    equipSlot: "pants",
    imagePath: "/images/item-icons/bassinian-warder-breeches.png",
    equipType: "light-pants",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_PANTSOVER",
              layer: EQUIPMENT.PANTS.UNTUCKED
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-coat",
    name: "Bassinian Warder Coat",
    equipSlot: "chest",
    imagePath: "/images/item-icons/bassinian-warder-coat.png",
    equipType: "light-chest",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_CHESTOVER",
              layer: EQUIPMENT.CHEST.BODY.UNTUCKED
            }
          ],
          "1h left": [
            {
              filename: BW + "M04_ONEHLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
            }
          ],
          "1h right": [
            {
              filename: BW + "M04_ONEHRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
            }
          ],
          "2h": [
            {
              filename: BW + "M04_TWOHRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
            },
            {
              filename: BW + "M04_TWOHLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
            }
          ],
          "2h crossbow": [
            {
              filename: BW + "M04_TWOHCBRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
            },
            {
              filename: BW + "M04_TWOHCBLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
            }
          ],
          "1h left crossbow": [
            {
              filename: BW + "M04_ONEHCBLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
            }
          ],
          "1h right crossbow": [
            {
              filename: BW + "M04_ONEHCBRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
            }
          ],
          "throwing left": [
            {
              filename: BW + "M04_ARMLTHROWING",
              layer: EQUIPMENT.CHEST.OFFHAND.THROWING
            }
          ],
          "throwing right": [
            {
              filename: BW + "M04_ARMRTHROWING",
              layer: EQUIPMENT.CHEST.MAINHAND.THROWING
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-gloves",
    name: "Bassinian Warder Gloves",
    equipSlot: "gloves",
    imagePath: "/images/item-icons/bassinian-warder-gloves.png",
    equipType: "light-gloves"
  },
  {
    id: "e.bassinian-warder-hat",
    name: "Bassinian Warder Hat",
    equipSlot: "helm",
    imagePath: "/images/item-icons/bassinian-warder-hat.png",
    equipType: "light-helm",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            { filename: BW + "M04_HELMET", layer: EQUIPMENT.HELM },
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-shoes",
    name: "Bassinian Warder Shoes",
    equipSlot: "boots",
    imagePath: "/images/item-icons/bassinian-warder-shoes.png",
    equipType: "light-boots",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_FOOTUNDER",
              layer: EQUIPMENT.BOOTS.TUCKED
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-sidearm",
    name: "Bassinian Warder Sidearm",
    equipSlot: "main-hand",
    equipType: "sword",
    twoHanded: false,
    characterDisplay: {
      perSex: {
        male: {
          "1h left": [
            {
              filename: BW + "M04_ONEHLWEAPON",
              layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
