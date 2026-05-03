import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `demonsbane` — `equipSet` for catalog grouping: `demonsbane` (file `demonsbane.ts`). */
export const demonsbaneEquipment = [
    {
      id: "e.demonsbanes-armor",
      name: "Demonsbane's Armor",
      equipSlot: "chest",
      imagePath: "/images/item-icons/demonsbanes-armor.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.demonsbanes-gauntlets",
      name: "Demonsbane's Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/demonsbanes-gauntlets.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.demonsbanes-helm",
      name: "Demonsbane's Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/demonsbanes-helm.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.demonsbanes-legs",
      name: "Demonsbane's Legs",
      equipSlot: "pants",
      imagePath: "/images/item-icons/demonsbanes-legs.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.demonsbanes-sabatons",
      name: "Demonsbane's Sabatons",
      equipSlot: "boots",
      imagePath: "/images/item-icons/demonsbanes-sabatons.png",
      equipType: "heavy-boots",
    },
] as const satisfies readonly ItemEquip[];
