import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `naitour-patrol` — `equipSet` for catalog grouping: `naitourPatrol` (file `naitourPatrol.ts`). */
export const naitourPatrolEquipment = [
    {
      id: "e.naitour-patrol-blade",
      name: "Naitour Patrol Blade",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/naitour-patrol-blade.png",
      equipType: "sword",
    },
    {
      id: "e.naitour-patrol-cuisses",
      name: "Naitour Patrol Cuisses",
      equipSlot: "pants",
      imagePath: "/images/item-icons/naitour-patrol-cuisses.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.naitour-patrol-gauntlets",
      name: "Naitour Patrol Gauntlets",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/naitour-patrol-gauntlets.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.naitour-patrol-helm",
      name: "Naitour Patrol Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/naitour-patrol-helm.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.naitour-patrol-mail",
      name: "Naitour Patrol Mail",
      equipSlot: "chest",
      imagePath: "/images/item-icons/naitour-patrol-mail.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.naitour-patrol-sabatons",
      name: "Naitour Patrol Sabatons",
      equipSlot: "boots",
      imagePath: "/images/item-icons/naitour-patrol-sabatons.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.naitour-patrol-shield",
      name: "Naitour Patrol Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/naitour-patrol-shield.png",
      equipType: "medium-shield",
    },
] as const satisfies readonly ItemEquip[];
