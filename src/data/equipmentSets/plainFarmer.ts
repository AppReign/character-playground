import type { ItemEquip } from "../../interfaces/Config";

const PF = "plainFarmer/";

/** Vanity set `plain-farmer` — `equipSet` for catalog grouping: `plainFarmer` (file `plainFarmer.ts`). */
export const plainFarmerEquipment = [
    {
      id: "e.plain-cloth-pants",
      name: "Plain Cloth Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/plain-cloth-pants.png",
      equipType: "light-pants",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              {
                filename: PF + "M02_PANTSOVER",
                layer: "base"
              }
            ]
          }
        }
      }
    },
    {
      id: "e.plain-farmers-tunic",
      name: "Plain Farmer's Tunic",
      equipSlot: "chest",
      imagePath: "/images/item-icons/plain-farmers-tunic.png",
      equipType: "light-chest",
      characterDisplay: {
        perSex: {
          male: {
            all: [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_BASE",
                layer: "base"
              }
            ],
            "1h mainhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_1H",
                layer: "base"
              }
            ],
            "1h offhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_OFFHAND_1H",
                layer: "base"
              }
            ],
            "2h": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_2H",
                layer: "base"
              }
            ],
            "2h crossbow": [
              {
                filename: PF + "M02_TWOHCBRARM",
                layer: "base"
              }
            ],
            "1h mainhand crossbow": [
              {
                filename: PF + "M02_ONEHCBLARM",
                layer: "base"
              }
            ],
            "1h offhand crossbow": [
              {
                filename: PF + "M02_ONEHCBRARM",
                layer: "base"
              }
            ],
            "throwing mainhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_OFFHAND_THROWING",
                layer: "base"
              }
            ],
            "throwing offhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_THROWING",
                layer: "base"
              }
            ]
          }
        }
      }
    },
    {
      id: "e.training-sword",
      name: "Training Sword",
      equipSlot: "main-hand",
      imagePath: "/images/item/weapons/swords/starter-sword.png",
      equipType: "sword",
    },
] as const satisfies readonly ItemEquip[];
