import { EquipSlot } from "../config/equipSlots";
import { ZIndexLayerKey } from "../config/zIndex";

/** One drawable row in a equipment POC; `layer` maps to draw order via `zIndexValue` in `equipmentFromPoc`. */
export type ConfigPocImageRow = {
  filename: string;
  layer: ZIndexLayerKey;
};

export type Pose =
  | "all"
  | "2h"
  | "2h crossbow"
  | "1h right"
  | "1h left crossbow"
  | "1h right crossbow"
  | "throwing right"
  | "1h left"
  | "throwing left";

type EquipType =
  | "aerial"
  | "aquatic"
  | "bow"
  | "buckler-shield"
  | "crossbow"
  | "dagger"
  | "darts"
  | "drake"
  | "heavy-boots"
  | "heavy-chest"
  | "heavy-gloves"
  | "heavy-helm"
  | "heavy-pants"
  | "impact"
  | "inorganic"
  | "light-boots"
  | "light-chest"
  | "light-gloves"
  | "light-helm"
  | "light-pants"
  | "mace"
  | "medium-boots"
  | "medium-chest"
  | "medium-gloves"
  | "medium-helm"
  | "medium-pants"
  | "medium-shield"
  | "orb"
  | "polearm"
  | "ring"
  | "rod"
  | "staff"
  | "steed"
  | "sword"
  | "terrestrial"
  | "thrown"
  | "tower-shield"
  | "wand"
  | "whip";

export type ItemEquip = {
  id: string;
  name: string;
  equipSlot: EquipSlot;
  equipSet: string;
  images: Partial<Record<Pose, ConfigPocImageRow[]>>;
  equipType?: EquipType;
  twoHanded?: boolean;
};


export interface ConfigPartType {
  id: number;
  name: string;
}

/** Equipment pipeline resolves numeric `zIndex` from POC `layer`; base body uses `layer` only (see `baseLayer.ts`). */
export type ConfigImage =
  | {
      filename: string;
      zIndex: number;
      src?: string;
    }
  | {
      filename: string;
      layer: ZIndexLayerKey;
      src?: string;
    };

export interface ConfigPart {
  name: string;
  images: ConfigImage[];
  pose: Pose;
}

export interface ConfigPartEquipment extends ConfigPart {
  equipSlot: EquipSlot;
  /** Optional: e.g. "sword", "bow". Use Extract<EquipType, "sword" | "bow"> to allow only those. */
  equipType?: EquipType;
  /** Empty string when part is not part of a named set (e.g. generic crossbows). */
  equipSet: '' | 'plainFarmer' | 'miray' | 'bassinianWarder' | 'conqueror' | 'test';
  twoHanded?: boolean;
  /** When set, drawable layers are resolved from `equipmentPocRegistry[configPocKey]` using current main/off-hand poses. */
  configPocKey?: string;
}

export default interface Config {
  partTypes: ConfigPartType[];
  parts: ConfigPart[];
}
