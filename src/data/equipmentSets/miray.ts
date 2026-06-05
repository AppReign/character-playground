import type { ItemEquip } from "../../interfaces/Config";
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
                layer: "under"
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
              { filename: MR + "M03_HELMET", layer: "base" }
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
                layer: "base"
              }
            ],
            "1h mainhand": [
              {
                filename: MR + "M03_ONEHLARM",
                layer: "base"
              }
            ],
            "1h offhand": [
              {
                filename: MR + "M03_ONEHRARM",
                layer: "base"
              }
            ],
            "2h": [
              {
                filename: MR + "M03_TWOHRARM",
                layer: "base"
              }
            ],
            "2h crossbow": [
              {
                filename: MR + "M03_TWOHCBRARM",
                layer: "base"
              }
            ],
            "1h mainhand crossbow": [
              {
                filename: MR + "M03_ONEHCBLARM",
                layer: "base"
              }
            ],
            "1h offhand crossbow": [
              {
                filename: MR + "M03_ONEHCBRARM",
                layer: "base"
              }
            ],
            "throwing mainhand": [
              {
                filename: MR + "M03_ARMLTHROWING",
                layer: "base"
              }
            ],
            "throwing offhand": [
              {
                filename: MR + "M03_ARMRTHROWING",
                layer: "base"
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
                layer: "base"
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
            "1h mainhand": [
              {
                filename: MR + "M03_ONEHLWEAPON",
                layer: "under"
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
              { filename: MR + "M03_PANTS", layer: "base" }
            ]
          }
        }
      }
    },
] as const satisfies readonly ItemEquip[];
