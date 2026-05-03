/** Human-readable label for camelCase equipSet ids (e.g. `bassinianWarder`). */
export function formatEquipSetLabel(id: string): string {
  const spaced = id.replace(/([A-Z])/g, " $1").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
