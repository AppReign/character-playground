import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `granite-blesser` — `equipSet` for catalog grouping: `graniteBlesser` (file `graniteBlesser.ts`). */
export const graniteBlesserEquipment = [
    {
      id: "e.granite-blessers-boots",
      name: "Granite-Blesser's Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/granite-blessers-boots.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.granite-blessers-chestplate",
      name: "Granite-Blesser's Chestplate",
      equipSlot: "chest",
      imagePath: "/images/item-icons/granite-blessers-chestplate.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.granite-blessers-cuisses",
      name: "Granite-Blesser's Cuisses",
      equipSlot: "pants",
      imagePath: "/images/item-icons/granite-blessers-cuisses.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.granite-blessers-gauntlets",
      name: "Granite-Blesser's Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/granite-blessers-gauntlets.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.granite-blessers-guard",
      name: "Granite-Blesser's Guard",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/granite-blessers-guard.png",
      equipType: "tower-shield",
    },
    {
      id: "e.granite-blessers-rod",
      name: "Granite-Blesser's Rod",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/granite-blessers-rod.png",
      equipType: "rod",
    },
    {
      id: "e.granite-blessers-visor",
      name: "Granite-Blesser's Visor",
      equipSlot: "helm",
      imagePath: "/images/item-icons/granite-blessers-visor.png",
      equipType: "heavy-helm",
    },
] as const satisfies readonly ItemEquip[];
