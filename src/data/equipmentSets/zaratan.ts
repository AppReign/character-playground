import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `zaratan` — `equipSet` for catalog grouping: `zaratan` (file `zaratan.ts`). */
export const zaratanEquipment = [
    {
      id: "e.zaratans-gauntlets",
      name: "Zaratan's Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/zaratans-gauntlets.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.zaratans-guard",
      name: "Zaratan's Guard",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/zaratans-guard.png",
      equipType: "medium-shield",
    },
    {
      id: "e.zaratans-helm",
      name: "Zaratan's Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/zaratans-helm.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.zaratans-legplates",
      name: "Zaratan's Legplates",
      equipSlot: "pants",
      imagePath: "/images/item-icons/zaratans-legplates.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.zaratans-mace",
      name: "Zaratan's Mace",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/zaratans-mace.png",
      equipType: "mace",
    },
    {
      id: "e.zaratans-sabatons",
      name: "Zaratan's Sabatons",
      equipSlot: "boots",
      imagePath: "/images/item-icons/zaratans-sabatons.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.zaratans-shell",
      name: "Zaratan's Shell",
      equipSlot: "chest",
      imagePath: "/images/item-icons/zaratans-shell.png",
      equipType: "heavy-chest",
    },
] as const satisfies readonly ItemEquip[];
