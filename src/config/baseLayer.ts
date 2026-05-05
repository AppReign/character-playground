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
    BASE: "BODY_HEAD_BASE"
  },
  HAIR: {
    OVER: "BODY_HAIR_OVER",
    UNDER: "BODY_HAIR_UNDER"
  },
  CHEST: {
    BASE: "BODY_CHEST_BASE"
  },
  UNDERWEAR: {
    TOP: "BODY_UNDERWEAR_TOP",
    BOTTOM: "BODY_UNDERWEAR_BOTTOM"
  },
  FOOT: {
    BASE: "BODY_FOOT_BASE" // do we need this? can we put it on the body?
  },
  ARMS: {
    ONE_HANDED: {
      LEFT: {
        ARM: "BODY_ONEHLARM", // arm that includes a hand layer (under)
        FINGERS: "BODY_ONEHLFINGERS" // move to hand layer (over)
      },
      RIGHT: {
        ARM: "BODY_ONEHRARM", // arm that includes a hand layer (under)
        FINGERS: "BODY_ONEHRFINGERS" // move to hand layer (over)
      },
      CROSSBOW: {
        LEFT: "BODY_ONEHCBLARM", // arm that includes a hand layer (under)
        RIGHT: "BODY_ONEHCBRARM" // arm that includes a hand layer (under)
      }
    },
    TWO_HANDED: {
      DEFAULT: {
        RIGHT_ARM: "BODY_TWOHRARM", // arm that includes a hand layer (under)
        LEFT_FINGERS: "BODY_TWOHLFINGERS", // move to hand layer (over)
        LEFT_ARM: "BODY_TWOHLARM", // arm that includes a hand layer (under)
        RIGHT_FINGERS: "BODY_TWOHRFINGERS" // move to hand layer (over)
      },
      CROSSBOW: {
        RIGHT_ARM: "BODY_TWOHCBRARM", // arm that includes a hand layer (under)
        LEFT_FINGERS: "BODY_TWOHCBLFINGERS", // move to hand layer (over)
        LEFT_ARM: "BODY_TWOHCBLARM" // arm that includes a hand layer (under)
      }
    },
    THROWING: {
      LEFT: "BODY_ARMLTHROWING", // arm that includes a hand layer
      RIGHT: "BODY_ARMRTHROWING" // arm that includes a hand layer
    }
  }
} as const;
