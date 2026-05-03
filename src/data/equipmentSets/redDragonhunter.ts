import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `red-dragonhunter` — `equipSet` for catalog grouping: `redDragonhunter` (file `redDragonhunter.ts`). */
export const redDragonhunterEquipment = [
    {
      id: "e.red-dragonhunters-armor",
      name: "Red Dragonhunter's Armor",
      equipSlot: "chest",
      imagePath: "/images/item-icons/red-dragonhunters-armor.png",
      equipType: "medium-chest",
    },
    {
      id: "e.red-dragonhunters-boots",
      name: "Red Dragonhunter's Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/red-dragonhunters-boots.png",
      equipType: "medium-boots",
    },
    {
      id: "e.red-dragonhunters-gloves",
      name: "Red Dragonhunter's Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/red-dragonhunters-gloves.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.red-dragonhunters-helm",
      name: "Red Dragonhunter's Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/red-dragonhunters-helm.png",
      equipType: "medium-helm",
    },
    {
      id: "e.red-dragonhunters-lance",
      name: "Red Dragonhunter's Lance",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/red-dragonhunters-lance.png",
      equipType: "polearm",
    },
    {
      id: "e.red-dragonhunters-pants",
      name: "Red Dragonhunter's Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/red-dragonhunters-pants.png",
      equipType: "medium-pants",
    },
    {
      id: "e.red-dragonhunters-shield",
      name: "Red Dragonhunter's Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/red-dragonhunters-shield.png",
      equipType: "medium-shield",
    },
] as const satisfies readonly ItemEquip[];
