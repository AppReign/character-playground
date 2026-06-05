import type { ItemEquip } from "../../interfaces/Config";
import { EQUIPMENT } from "../../layers/equipmentLayer";

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
                layer: EQUIPMENT.PANTS.UNTUCKED
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
                layer: EQUIPMENT.CHEST.BODY.UNTUCKED
              }
            ],
            "1h mainhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_1H",
                layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
              }
            ],
            "1h offhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_OFFHAND_1H",
                layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
              }
            ],
            "2h": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_2H",
                layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
              },
              {
                filename: PF + "M02_PLAINFARMER_CHEST_OFFHAND_2H",
                layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
              }
            ],
            "2h crossbow": [
              {
                filename: PF + "M02_TWOHCBRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
              },
              {
                filename: PF + "M02_TWOHCBLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
              }
            ],
            "1h mainhand crossbow": [
              {
                filename: PF + "M02_ONEHCBLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "1h offhand crossbow": [
              {
                filename: PF + "M02_ONEHCBRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "throwing mainhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_OFFHAND_THROWING",
                layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
              }
            ],
            "throwing offhand": [
              {
                filename: PF + "M02_PLAINFARMER_CHEST_MAINHAND_THROWING",
                layer: EQUIPMENT.CHEST.MAINHAND.THROWING
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
