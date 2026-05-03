import type { ItemEquip } from "../../interfaces/Config";
import { EQUIPMENT } from "../../config/equipmentLayer";

const CQ = "conqueror/";

/** Vanity set `conqueror` — `equipSet` for catalog grouping: `conqueror` (file `conqueror.ts`). */
export const conquerorEquipment = [
  {
    id: "e.conquerors-cuisses",
    name: "Conqueror's Cuisses",
    equipSlot: "pants",
    imagePath: "/images/item-icons/conquerors-cuisses.png",
    equipType: "heavy-pants",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            { filename: CQ + "M05_PANTS", layer: EQUIPMENT.PANTS.UNTUCKED }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-lamellar-cuirass",
    name: "Conqueror's Lamellar Cuirass",
    equipSlot: "chest",
    imagePath: "/images/item-icons/conquerors-lamellar-cuirass.png",
    equipType: "heavy-chest",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: CQ + "M05_CHESTOVER",
              layer: EQUIPMENT.CHEST.BODY.UNTUCKED
            }
          ],
          "1h left": [
            {
              filename: CQ + "M05_ONEHLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.ONE_HANDED
            }
          ],
          "1h right": [
            {
              filename: CQ + "M05_ONEHRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.ONE_HANDED
            }
          ],
          "2h": [
            {
              filename: CQ + "M05_TWOHRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.TWO_HANDED
            },
            {
              filename: CQ + "M05_TWOHLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.TWO_HANDED
            }
          ],
          "2h crossbow": [
            {
              filename: CQ + "M05_TWOHCBRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED
            },
            {
              filename: CQ + "M05_TWOHCBLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_TWO_HANDED
            }
          ],
          "1h left crossbow": [
            {
              filename: CQ + "M05_ONEHCBLARM",
              layer: EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED
            }
          ],
          "1h right crossbow": [
            {
              filename: CQ + "M05_ONEHCBRARM",
              layer: EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED
            }
          ],
          "throwing left": [
            {
              filename: CQ + "M05_ARMLTHROWING",
              layer: EQUIPMENT.CHEST.OFFHAND.THROWING
            }
          ],
          "throwing right": [
            {
              filename: CQ + "M05_ARMRTHROWING",
              layer: EQUIPMENT.CHEST.MAINHAND.THROWING
            }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-sabatons",
    name: "Conqueror's Sabatons",
    equipSlot: "boots",
    imagePath: "/images/item-icons/conquerors-sabatons.png",
    equipType: "heavy-boots",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: CQ + "M05_FOOTUNDER",
              layer: EQUIPMENT.BOOTS.TUCKED
            }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-sallet",
    name: "Conqueror's Sallet",
    equipSlot: "helm",
    imagePath: "/images/item-icons/conquerors-sallet.png",
    equipType: "heavy-helm",
    characterDisplay: {
      perSex: {
        male: {
          all: [{ filename: CQ + "M05_HELMET", layer: EQUIPMENT.HELM }]
        }
      }
    }
  },
  {
    id: "e.conquerors-vambraces",
    name: "Conqueror's Vambraces",
    equipSlot: "gloves",
    imagePath: "/images/item-icons/conquerors-vambraces.png",
    equipType: "heavy-gloves"
  },
  {
    id: "e.jida-of-sovereign-hope",
    name: "Jida of Sovereign Hope",
    equipSlot: "off-hand",
    imagePath: "/images/item-icons/jida-of-sovereign-hope.png",
    equipType: "polearm"
  },
  {
    id: "e.saber-of-bloody-freedom",
    name: "Saber of Bloody Freedom",
    equipSlot: "main-hand",
    imagePath: "/images/item-icons/hooded-veil-slicer.png",
    equipType: "sword",
    characterDisplay: {
      perSex: {
        male: {
          "1h left": [
            {
              filename: CQ + "M05_ONEHLWEAPON",
              layer: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
