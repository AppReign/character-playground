/**
 * Designer-friendly names for non-equipment (“base body”) layers.
 *
 * Leaf string values are keys in `zIndex` (valid `ZIndexLayerKey`). They use a
 * `BODY_*` prefix so they never collide with `EQUIPMENT` leaf strings in
 * `equipmentLayer.ts`.
 *
 * This file is intentionally separate from `equipmentLayer.ts` so base-body asset
 * authors can work without touching equipment layering.
 */
export const BODY = {
  HEAD: {
    BASE: "BODY_HEAD"
  },
  HAIR: {
    OVER: "BODY_HAIR"
  },
  CHEST: {
    BASE: "BODY_CHESTUNDER"
  },
  UNDERWEAR: {
    BOTTOM: "BODY_PANTSOVER"
  },
  FOOT: {
    BASE: "BODY_FOOTUNDER"
  },
  ARMS: {
    ONE_HANDED: {
      LEFT: {
        ARM: "BODY_ONEHLARM",
        FINGERS: "BODY_ONEHLFINGERS"
      },
      RIGHT: {
        ARM: "BODY_ONEHRARM",
        FINGERS: "BODY_ONEHRFINGERS"
      },
      CROSSBOW: {
        LEFT: "BODY_ONEHCBLARM",
        RIGHT: "BODY_ONEHCBRARM"
      }
    },
    TWO_HANDED: {
      DEFAULT: {
        RIGHT_ARM: "BODY_TWOHRARM",
        LEFT_FINGERS: "BODY_TWOHLFINGERS",
        LEFT_ARM: "BODY_TWOHLARM",
        RIGHT_FINGERS: "BODY_TWOHRFINGERS"
      },
      CROSSBOW: {
        RIGHT_ARM: "BODY_TWOHCBRARM",
        LEFT_FINGERS: "BODY_TWOHCBLFINGERS",
        LEFT_ARM: "BODY_TWOHCBLARM"
      }
    },
    THROWING: {
      LEFT: "BODY_ARMLTHROWING",
      RIGHT: "BODY_ARMRTHROWING"
    }
  }
} as const;
