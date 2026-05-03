import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `meftet` — `equipSet` for catalog grouping: `meftet` (file `meftet.ts`). */
export const meftetEquipment = [
    {
      id: "e.meftets-blade",
      name: "Meftet's Blade",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/meftets-blade.png",
      equipType: "sword",
    },
    {
      id: "e.meftets-cap",
      name: "Meftet's Cap",
      equipSlot: "helm",
      imagePath: "/images/item-icons/meftets-cap.png",
      equipType: "medium-helm",
    },
    {
      id: "e.meftets-claws",
      name: "Meftet's Claws",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/meftets-claws.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.meftets-leather",
      name: "Meftet's Leather",
      equipSlot: "chest",
      imagePath: "/images/item-icons/meftets-leather.png",
      equipType: "medium-chest",
    },
    {
      id: "e.meftets-pants",
      name: "Meftet's Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/meftets-pants.png",
      equipType: "medium-pants",
    },
    {
      id: "e.meftets-plumbatae",
      name: "Meftet's Plumbatae",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/meftets-plumbatae.png",
      equipType: "darts",
    },
    {
      id: "e.meftets-shoes",
      name: "Meftet's Shoes",
      equipSlot: "boots",
      imagePath: "/images/item-icons/meftets-shoes.png",
      equipType: "medium-boots",
    },
] as const satisfies readonly ItemEquip[];
