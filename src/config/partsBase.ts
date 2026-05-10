import { ConfigPart } from "../interfaces/Config";
import { BODY } from "../layers/baseLayer";
import {
  deriveBaseArmBundlePoses,
  type EquipmentHandPose
} from "../utils/equipmentPose";

export const getBaseCharacterAssets = (pose: EquipmentHandPose) => {
  const baseAssets = [...partsBaseBody];
  const [armPoseA, armPoseB] = deriveBaseArmBundlePoses(pose);
  baseAssets.push(...partsBaseArms.filter((part) => part.pose === armPoseA));
  baseAssets.push(...partsBaseArms.filter((part) => part.pose === armPoseB));
  return baseAssets;
};

/**
 * Base character parts: face/body, hair, bare body (torso and legs), base pants.
 * No arms.
 */
export const partsBaseBody: ConfigPart[] = [
  {
    name: "MALE",
    pose: 'all',
    images: [
      {
        filename: "M01_HEAD",
        layer: BODY.HEAD.BASE
      }
    ]
  },
  {
    name: "BASE HAIR MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_HAIR",
        layer: BODY.HAIR.OVER
      }
    ]
  },
  {
    name: "BASE BODY MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_CHESTUNDER",
        layer: BODY.BODY.BASE
      }
    ]
  },
  {
    name: "BASE PANTS MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_PANTSOVER",
        layer: BODY.UNDERWEAR.BOTTOM
      }
    ]
  }
];


/**
 * Base character arm poses only (M01 set).
 */
export const partsBaseArms: ConfigPart[] = [
  {
    name: "ARMS 1H LEFT MALE 01",
    pose: '1h left',
    images: [
      {
        filename: "M01_ONEHLARM",
        layer: BODY.MAINHAND.ONE_HANDED.UNDER
      },
      {
        filename: "M01_ONEHLFINGERS",
        layer: BODY.MAINHAND.ONE_HANDED.OVER
      }
    ]
  },
  {
    name: "ARMS 1H RIGHT MALE 01",
    pose: '1h right',
    images: [
      {
        filename: "M01_ONEHRARM",
        layer: BODY.OFFHAND.ONE_HANDED.UNDER
      },
      {
        filename: "M01_ONEHRFINGERS",
        layer: BODY.OFFHAND.ONE_HANDED.OVER
      }
    ]
  },
  {
    name: "TWO HANDED ARMS MALE 01",
    pose: '2h',
    images: [
      {
        filename: "M01_TWOHRARM",
        layer: BODY.OFFHAND.TWO_HANDED.UNDER
      },
      {
        filename: "M01_TWOHLFINGERS",
        layer: BODY.MAINHAND.TWO_HANDED.OVER
      },
      {
        filename: "M01_TWOHLARM",
        layer: BODY.MAINHAND.TWO_HANDED.UNDER
      },
      {
        filename: "M01_TWOHRFINGERS",
        layer: BODY.OFFHAND.TWO_HANDED.OVER
      }
    ]
  },
  {
    name: "CROSSBOW ARMS 2H",
    pose: '2h crossbow',
    images: [
      {
        filename: "M01_TWOHCBRARM",
        layer: BODY.OFFHAND.TWO_HANDED_CROSSBOW.UNDER
      },
      {
        filename: "M01_TWOHCBLFINGERS",
        layer: BODY.MAINHAND.TWO_HANDED_CROSSBOW.OVER
      },
      {
        filename: "M01_TWOHCBLARM",
        layer: BODY.MAINHAND.TWO_HANDED_CROSSBOW.UNDER
      }
    ]
  },
  {
    name: "1H CROSSBOW LEFT ARM",
    pose: '1h left crossbow',
    images: [
      {
        filename: "M01_ONEHCBLARM",
        layer: BODY.MAINHAND.ONE_HANDED_CROSSBOW.UNDER
      }
    ]
  },
  {
    name: "1H CROSSBOW RIGHT ARM",
    pose: '1h right crossbow',
    images: [
      {
        filename: "M01_ONEHCBRARM",
        layer: BODY.OFFHAND.ONE_HANDED_CROSSBOW.UNDER
      }
    ]
  },
  {
    name: "ARMS 1H LEFT THROWING MALE 01",
    pose: 'throwing left',
    images: [
      {
        filename: "M01_ARMLTHROWING",
        layer: BODY.MAINHAND.ONE_HANDED_THROWING.UNDER
      }
    ]
  },
  {
    name: "ARMS 1H RIGHT THROWING MALE 01",
    pose: 'throwing right',
    images: [
      {
        filename: "M01_ARMRTHROWING",
        layer: BODY.OFFHAND.ONE_HANDED_THROWING.UNDER
      }
    ]
  }
];

/**
 * Base character parts: body + arms (same as before, for backward compatibility).
 */
const partsBase: ConfigPart[] = [...partsBaseBody, ...partsBaseArms];

export default partsBase;
