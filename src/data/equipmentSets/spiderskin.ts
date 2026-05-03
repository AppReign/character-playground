import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `spiderskin` — `equipSet` for catalog grouping: `spiderskin` (file `spiderskin.ts`). */
export const spiderskinEquipment = [
    {
      id: "e.spiderskin-cap",
      name: "Spiderskin Cap",
      equipSlot: "helm",
      imagePath: "/images/item-icons/spiderskin-cap.png",
      equipType: "medium-helm",
    },
    {
      id: "e.spiderskin-chest",
      name: "Spiderskin Chest",
      equipSlot: "chest",
      imagePath: "/images/item-icons/spiderskin-chest.png",
      equipType: "medium-chest",
    },
    {
      id: "e.spiderskin-feet",
      name: "Spiderskin Feet",
      equipSlot: "boots",
      imagePath: "/images/item-icons/spiderskin-feet.png",
      equipType: "medium-boots",
    },
    {
      id: "e.spiderskin-gloves",
      name: "Spiderskin Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/spiderskin-gloves.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.spiderskin-pants",
      name: "Spiderskin Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/spiderskin-pants.png",
      equipType: "medium-pants",
    },
] as const satisfies readonly ItemEquip[];
