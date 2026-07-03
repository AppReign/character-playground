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
  cdnCacheBust: string;
} {
  const { ready, loading, error, bundles, itemById, cdnBaseUrl, cdnCacheBust } =
    useCreatorEquipment();

  const catalog = useMemo(() => {
    if (!ready || !bundles.length) return [];
    const base = buildEquipmentCatalog(bundles);
    return catalogWithCdnUrls(base, itemById, cdnBaseUrl, "male", cdnCacheBust);
  }, [ready, bundles, itemById, cdnBaseUrl, cdnCacheBust]);

  const itemEquipById = useMemo(
    () => itemEquipByIdFromBundles(bundles),
    [bundles]
  );

  return { ready, loading, error, catalog, itemEquipById, itemById, cdnBaseUrl, cdnCacheBust };
}
