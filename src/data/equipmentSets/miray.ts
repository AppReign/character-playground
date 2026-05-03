import type { ItemEquip } from "../../interfaces/Config";
import { EQUIPMENT } from "../../config/equipmentLayer";
const MR = "miray/";

/** Vanity set `miray` — `equipSet` for catalog grouping: `miray` (file `miray.ts`). */
export const mirayEquipment = [
    {
      id: "e.mirays-aegis",
      name: "Miray's Aegis",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/mirays-aegis.png",
      equipType: "buckler-shield",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              {
                filename: MR + "M03_RSHIELD",
                layer: EQUIPMENT.OFFHAND.ONE_HANDED.SHIELD.UNDER
              }
            ]
          }
        }
      }
    },
    {
      id: "e.mirays-bascinet",
      name: "Miray's Bascinet",
      equipSlot: "helm",
      imagePath: "/images/item-icons/mirays-bascinet.png",
      equipType: "medium-helm",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              { filename: MR + "M03_HELMET", layer: EQUIPMENT.HELM }
            ]
          }
        }
      }
    },
    {
      id: "e.mirays-embrace",
      name: "Miray's Embrace",
      equipSlot: "chest",
      imagePath: "/images/item-icons/mirays-embrace.png",
      equipType: "medium-chest",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              {
                filename: MR + "M03_CHESTUNDER",
                layer: EQUIPMENT.CHEST.BODY.TUCKED
              }
            ],
            "1h left": [
              {
                filename: MR + "M03_ONEHLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
              }
            ],
            "1h right": [
              {
                filename: MR + "M03_ONEHRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
              }
            ],
            "2h": [
              {
                filename: MR + "M03_TWOHRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
              },
              {
                filename: MR + "M03_TWOHLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
              }
            ],
            "2h crossbow": [
              {
                filename: MR + "M03_TWOHCBRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
              },
              {
                filename: MR + "M03_TWOHCBLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
              }
            ],
            "1h left crossbow": [
              {
                filename: MR + "M03_ONEHCBLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "1h right crossbow": [
              {
                filename: MR + "M03_ONEHCBRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "throwing left": [
              {
                filename: MR + "M03_ARMLTHROWING",
                layer: EQUIPMENT.CHEST.OFFHAND.THROWING
              }
            ],
            "throwing right": [
              {
                filename: MR + "M03_ARMRTHROWING",
                layer: EQUIPMENT.CHEST.MAINHAND.THROWING
              }
            ]
          }
        }
      }
    },
    {
      id: "e.mirays-gauntlets",
      name: "Miray's Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/mirays-gauntlets.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.mirays-greaves",
      name: "Miray's Greaves",
      equipSlot: "boots",
      imagePath: "/images/item-icons/mirays-greaves.png",
      equipType: "medium-boots",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              {
                filename: MR + "M03_FOOTUNDER",
                layer: EQUIPMENT.BOOTS.UNTUCKED
              }
            ]
          }
        }
      }
    },
    {
      id: "e.mirays-lance",
      name: "Miray's Lance",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mirays-lance.png",
      equipType: "polearm",
      characterDisplay: {
        perSex: {
          male: {
            "1h left": [
              {
                filename: MR + "M03_ONEHLWEAPON",
                layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
              }
            ]
          }
        }
      }
    },
    {
      id: "e.mirays-legplates",
      name: "Miray's Legplates",
      equipSlot: "pants",
      imagePath: "/images/item-icons/mirays-legplates.png",
      equipType: "medium-pants",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              { filename: MR + "M03_PANTS", layer: EQUIPMENT.PANTS.UNTUCKED }
            ]
          }
        }
      }
    },
] as const satisfies readonly ItemEquip[];
