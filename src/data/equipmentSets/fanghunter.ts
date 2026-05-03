import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `fanghunter` — `equipSet` for catalog grouping: `fanghunter` (file `fanghunter.ts`). */
export const fanghunterEquipment = [
    {
      id: "e.fanghunters-boots",
      name: "Fanghunter's Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/fanghunters-boots.png",
      equipType: "medium-boots",
    },
    {
      id: "e.fanghunters-coverings",
      name: "Fanghunter's Coverings",
      equipSlot: "chest",
      imagePath: "/images/item-icons/fanghunters-coverings.png",
      equipType: "medium-chest",
    },
    {
      id: "e.fanghunters-cowl",
      name: "Fanghunter's Cowl",
      equipSlot: "helm",
      imagePath: "/images/item-icons/fanghunters-cowl.png",
      equipType: "medium-helm",
    },
    {
      id: "e.fanghunters-gloves",
      name: "Fanghunter's Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/fanghunters-gloves.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.fanghunters-leather-pants",
      name: "Fanghunter's Leather Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/fanghunters-leather-pants.png",
      equipType: "medium-pants",
    },
    {
      id: "e.fanghunters-quarreller",
      name: "Fanghunter's Quarreller",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/fanghunters-quarreller.png",
      equipType: "crossbow",
    },
    {
      id: "e.fanghunters-stake-sender",
      name: "Fanghunter's Stake-Sender",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/fanghunters-stake-sender.png",
      equipType: "crossbow",
    },
] as const satisfies readonly ItemEquip[];
