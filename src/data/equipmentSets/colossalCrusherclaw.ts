import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `colossal-crusherclaw` — `equipSet` for catalog grouping: `colossalCrusherclaw` (file `colossalCrusherclaw.ts`). */
export const colossalCrusherclawEquipment = [
    {
      id: "e.colossal-crusherclaw-boots",
      name: "Colossal Crusherclaw Boots",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.colossal-crusherclaw-carapace",
      name: "Colossal Crusherclaw Carapace",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.colossal-crusherclaw-claws",
      name: "Colossal Crusherclaw Claws",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.colossal-crusherclaw-helm",
      name: "Colossal Crusherclaw Helm",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.colossal-crusherclaw-pants",
      name: "Colossal Crusherclaw Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.colossal-crusherclaw-tower-shield",
      name: "Colossal Crusherclaw Tower Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "tower-shield",
    },
    {
      id: "e.colossal-crusherclaw-warhammer",
      name: "Colossal Crusherclaw Warhammer",
      equipSlot: "main-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "impact",
    },
] as const satisfies readonly ItemEquip[];
