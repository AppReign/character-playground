import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `sung-leather` — `equipSet` for catalog grouping: `sungLeather` (file `sungLeather.ts`). */
export const sungLeatherEquipment = [
    {
      id: "e.sung-leather-boots",
      name: "Sung Leather Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/sung-leather-boots.png",
      equipType: "medium-boots",
    },
    {
      id: "e.sung-leather-gloves",
      name: "Sung Leather Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/sung-leather-gloves.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.sung-leather-helm",
      name: "Sung Leather Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/sung-leather-helm.png",
      equipType: "medium-helm",
    },
    {
      id: "e.sung-leather-pants",
      name: "Sung Leather Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/sung-leather-pants.png",
      equipType: "medium-pants",
    },
    {
      id: "e.sung-leather-vest",
      name: "Sung Leather Vest",
      equipSlot: "chest",
      imagePath: "/images/item-icons/sung-leather-vest.png",
      equipType: "medium-chest",
    },
    {
      id: "e.sung-wooden-boomerang",
      name: "Sung Wooden Boomerang",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/sung-wooden-boomerang.png",
      equipType: "thrown",
    },
    {
      id: "e.sungreed-bullwhip",
      name: "Sungreed Bullwhip",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/sungreed-bullwhip.png",
      equipType: "whip",
    },
] as const satisfies readonly ItemEquip[];
