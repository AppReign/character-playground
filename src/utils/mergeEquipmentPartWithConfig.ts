import { ConfigImage, ConfigPart, ConfigPartEquipment } from "../interfaces/Config";

/** Same logical layer after URL round-trip (prefix vs basename). */
function filenamesMatch(
  catalogFilename: string,
  incomingFilename: string
): boolean {
  return (
    catalogFilename === incomingFilename ||
    catalogFilename.endsWith("/" + incomingFilename) ||
    incomingFilename.endsWith("/" + catalogFilename) ||
    incomingFilename.endsWith("/" + catalogFilename)
  );
}

/**
 * Merge equipment part (e.g. from URL or UI click) with catalog entry so:
 * — `images` always follow the catalog (count, order, zIndex, filenames)
 * — `src` is filled from catalog or incoming when filenames match
 * — catalog fields win (equipSlot, `configPocKey`, pose, …) so stale/partial payloads still behave
 */
export function mergeEquipmentPartWithConfig(
  part: ConfigPart,
  configParts: ConfigPartEquipment[]
): ConfigPartEquipment {
  const configPart = configParts.find((p) => p.name === part.name);
  if (!configPart || !configPart.images?.length) {
    return part as ConfigPartEquipment;
  }

  const incomingList: ConfigImage[] = part.images ?? [];

  const mergedImages = configPart.images.map((configImg) => {
    const incoming = incomingList.find((img) =>
      filenamesMatch(configImg.filename, img.filename)
    );

    const src = configImg.src ?? incoming?.src;

    return src != null && src !== ""
      ? { ...configImg, src }
      : { ...configImg };
  });

  return {
    ...part,
    ...configPart,
    images: mergedImages
  };
}
