export const EQUIPMENT = {
  HELM: "HELMET",
  CHEST: {
    BODY: {
      UNTUCKED: "CHESTOVER",
      TUCKED: "CHESTUNDER"
    },
    OFFHAND: {
      ONE_HANDED: "ONEHLARM",
      TWO_HANDED: "TWOHLARM",
      CROSSBOW_ONE_HANDED: "ONEHCBLARM",
      CROSSBOW_TWO_HANDED: "TWOHCBLARM",
      THROWING: "ARMLTHROWING"
    },
    MAINHAND: {
      ONE_HANDED: "ONEHRARM",
      TWO_HANDED: "TWOHRARM",
      CROSSBOW_ONE_HANDED: "ONEHCBRARM",
      CROSSBOW_TWO_HANDED: "TWOHCBRARM",
      THROWING: "ARMRTHROWING"
    },
  },
  OFFHAND: {
    ONE_HANDED: {
      CROSSBOW: {
        UNDER:  "ONEHCBRSLING",
        OVER: 'ONEHCBRBODY'
      },
      SHIELD: {
        UNDER: "RSHIELD"
      }
    }
  },
  MAINHAND: {
    ONE_HANDED: {
      DEFAULT: {
        UNDER: "ONEHLWEAPON"
      },
      CROSSBOW: {
        UNDER: 'ONEHCBLSLING',
        OVER: 'ONEHCBLBODY'
      }
    },
    TWO_HANDED: {
      CROSSBOW: {
        UNDER: 'TWOHCBSLING',
        OVER: 'TWOHCBBODY'
      }
    }
  },
  GLOVES: {
    UNDER: "GLOVESUNDER",
    OVER: "GLOVESOVER"
  },
  PANTS: {
    UNTUCKED: "PANTSOVER",
    TUCKED: "PANTSUNDER" // not implemented yet, I think we'll want to dynamically apply this based on chest
  },
  BOOTS: {
    TUCKED: "FOOTUNDER",
    UNTUCKED: "FOOTOVER"
  },
} as const;
