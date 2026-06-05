import { useMemo } from "react";

import { buildEquipmentCatalog } from "../config/equipmentDisplay";
import type { CreatorEquipmentItem } from "../utils/apiCharacterDisplay";
import { useCreatorEquipment } from "../context/CreatorEquipmentContext";
import type { ConfigPartEquipment, ItemEquip } from "../interfaces/Config";
import {
  catalogWithCdnUrls,
  itemEquipByIdFromBundles
} from "../utils/equipmentCatalog";

export function useEquipmentCatalog(): {
  ready: boolean;
  loading: boolean;
  error: string | null;
  catalog: ConfigPartEquipment[];
  itemEquipById: Record<string, ItemEquip>;
  itemById: Record<string, CreatorEquipmentItem>;
  cdnBaseUrl: string;
} {
  const { ready, loading, error, bundles, itemById, cdnBaseUrl } =
    useCreatorEquipment();

  const catalog = useMemo(() => {
    if (!ready || !bundles.length) return [];
    const base = buildEquipmentCatalog(bundles);
    return catalogWithCdnUrls(base, itemById, cdnBaseUrl);
  }, [ready, bundles, itemById, cdnBaseUrl]);

  const itemEquipById = useMemo(
    () => itemEquipByIdFromBundles(bundles),
    [bundles]
  );

  return { ready, loading, error, catalog, itemEquipById, itemById, cdnBaseUrl };
}
