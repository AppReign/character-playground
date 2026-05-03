import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `cumberworld` — `equipSet` for catalog grouping: `cumberworld` (file `cumberworld.ts`). */
export const cumberworldEquipment = [
    {
      id: "e.cumberworld-gloves",
      name: "Cumberworld Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/cumberworld-gloves.png",
      equipType: "light-gloves",
    },
    {
      id: "e.cumberworld-mask",
      name: "Cumberworld Mask",
      equipSlot: "helm",
      imagePath: "/images/item-icons/cumberworld-mask.png",
      equipType: "light-helm",
    },
    {
      id: "e.cumberworld-overalls",
      name: "Cumberworld Overalls",
      equipSlot: "pants",
      imagePath: "/images/item-icons/cumberworld-overalls.png",
      equipType: "light-pants",
    },
    {
      id: "e.cumberworld-paddle",
      name: "Cumberworld Paddle",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/cumberworld-paddle.png",
      equipType: "polearm",
    },
    {
      id: "e.cumberworld-poppers",
      name: "Cumberworld Poppers",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/cumberworld-poppers.png",
      equipType: "thrown",
    },
    {
      id: "e.cumberworld-shoes",
      name: "Cumberworld Shoes",
      equipSlot: "boots",
      imagePath: "/images/item-icons/cumberworld-shoes.png",
      equipType: "light-boots",
    },
    {
      id: "e.cumberworld-tunic",
      name: "Cumberworld Tunic",
      equipSlot: "chest",
      imagePath: "/images/item-icons/cumberworld-tunic.png",
      equipType: "light-chest",
    },
] as const satisfies readonly ItemEquip[];
