import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `chandler` — `equipSet` for catalog grouping: `chandler` (file `chandler.ts`). */
export const chandlerEquipment = [
    {
      id: "e.chandlers-chausses",
      name: "Chandler's Chausses",
      equipSlot: "pants",
      imagePath: "/images/item-icons/chandlers-chausses.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.chandlers-chestplate",
      name: "Chandler's Chestplate",
      equipSlot: "chest",
      imagePath: "/images/item-icons/chandlers-chestplate.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.chandlers-gauntlets",
      name: "Chandler's Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/chandlers-gauntlets.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.chandlers-guard",
      name: "Chandler's Guard",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/chandlers-guard.png",
      equipType: "medium-shield",
    },
    {
      id: "e.chandlers-helm",
      name: "Chandler's Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/chandlers-helm.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.chandlers-rod",
      name: "Chandler's Rod",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/chandlers-rod.png",
      equipType: "rod",
    },
    {
      id: "e.chandlers-sabatons",
      name: "Chandler's Sabatons",
      equipSlot: "boots",
      imagePath: "/images/item-icons/chandlers-sabatons.png",
      equipType: "heavy-boots",
    },
] as const satisfies readonly ItemEquip[];
