export type CharacterBasePartLayerEntry = {
  filename: string;
  layer: string;
};

/** One gender + skin color variant from the bulk API. */
export type CharacterBasePartsVariant = {
  id: string;
  gender: string;
  color: string;
  parts: Record<string, Record<string, CharacterBasePartLayerEntry[]>>;
};

/** `GET /api/data/character-base-parts` — gender → color → variant. */
export type CharacterBasePartsBundle = Record<
  string,
  Record<string, CharacterBasePartsVariant>
>;

export type CharacterBasePartImageRef = {
  partType: string;
  poseKey: string;
  filename: string;
  layer: string;
  url: string;
};
