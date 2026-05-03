import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `thunderbird` — `equipSet` for catalog grouping: `thunderbird` (file `thunderbird.ts`). */
export const thunderbirdEquipment = [
    {
      id: "e.thunderbirds-feather",
      name: "Thunderbird's Feather",
      equipSlot: "helm",
      imagePath: "/images/item-icons/thunderbirds-feather.png",
      equipType: "light-helm",
    },
    {
      id: "e.thunderbirds-gloves",
      name: "Thunderbird's Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/thunderbirds-gloves.png",
      equipType: "light-gloves",
    },
    {
      id: "e.thunderbirds-hide",
      name: "Thunderbird's Hide",
      equipSlot: "chest",
      imagePath: "/images/item-icons/thunderbirds-hide.png",
      equipType: "light-chest",
    },
    {
      id: "e.thunderbirds-moccasins",
      name: "Thunderbird's Moccasins",
      equipSlot: "boots",
      imagePath: "/images/item-icons/thunderbirds-moccasins.png",
      equipType: "light-boots",
    },
    {
      id: "e.thunderbirds-pants",
      name: "Thunderbird's Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/thunderbirds-pants.png",
      equipType: "light-pants",
    },
    {
      id: "e.thunderbirds-rod",
      name: "Thunderbird's Rod",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/thunderbirds-rod.png",
      equipType: "rod",
    },
    {
      id: "e.thunderbirds-swordbreaker",
      name: "Thunderbird's Swordbreaker",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/thunderbirds-swordbreaker.png",
      equipType: "dagger",
    },
] as const satisfies readonly ItemEquip[];
