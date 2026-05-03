import type { ItemEquip } from "../../interfaces/Config";
import { EQUIPMENT } from "../../config/equipmentLayer";

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
                filename: PF + "M02_CHESTOVER",
                layer: EQUIPMENT.CHEST.BODY.UNTUCKED
              }
            ],
            "1h left": [
              {
                filename: PF + "M02_ONEHLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
              }
            ],
            "1h right": [
              {
                filename: PF + "M02_ONEHRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
              }
            ],
            "2h": [
              {
                filename: PF + "M02_TWOHRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
              },
              {
                filename: PF + "M02_TWOHLARM",
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
            "1h left crossbow": [
              {
                filename: PF + "M02_ONEHCBLARM",
                layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "1h right crossbow": [
              {
                filename: PF + "M02_ONEHCBRARM",
                layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
              }
            ],
            "throwing left": [
              {
                filename: PF + "M02_ARMLTHROWING",
                layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
              }
            ],
            "throwing right": [
              {
                filename: PF + "M02_ARMRTHROWING",
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
