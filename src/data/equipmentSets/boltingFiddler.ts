import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `bolting-fiddler` — `equipSet` for catalog grouping: `boltingFiddler` (file `boltingFiddler.ts`). */
export const boltingFiddlerEquipment = [
    {
      id: "e.bolting-fiddler-blade",
      name: "Bolting Fiddler Blade",
      equipSlot: "main-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "sword",
    },
    {
      id: "e.bolting-fiddler-boots",
      name: "Bolting Fiddler Boots",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.bolting-fiddler-carapace",
      name: "Bolting Fiddler Carapace",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.bolting-fiddler-claws",
      name: "Bolting Fiddler Claws",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.bolting-fiddler-helm",
      name: "Bolting Fiddler Helm",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.bolting-fiddler-pants",
      name: "Bolting Fiddler Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.bolting-fiddler-shield",
      name: "Bolting Fiddler Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-shield",
    },
] as const satisfies readonly ItemEquip[];
