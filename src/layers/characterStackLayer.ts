/** Stack slot stored in `characterDisplay` JSON and the upload API. */
export type CharacterStackLayer = "base" | "over" | "under";

export function normalizeStackLayer(layer: string): CharacterStackLayer | null {
  const value = layer.trim().toLowerCase();
  if (value === "base" || value === "over" || value === "under") {
    return value;
  }
  return null;
}
