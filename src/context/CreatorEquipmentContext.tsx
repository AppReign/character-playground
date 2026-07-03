import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { CREATOR_EQUIPMENT_ITEM_IDS } from "../config/creatorEquipmentItemIds";
import type { ItemEquip } from "../interfaces/Config";
import { getCharacterCdnBaseUrl } from "../config/characterCdn";
import { fetchItemsBatch } from "../services/itemsBatchApi";
import type { EquipmentSetBundle } from "../types/equipmentSet";
import {
  apiItemToCreatorItem,
  creatorItemToItemEquip,
  type CreatorEquipmentItem
} from "../utils/apiCharacterDisplay";
import { useAuth } from "./AuthContext";
import { useCharacterCdnCacheBust } from "./CharacterCdnCacheBustContext";

type CreatorEquipmentContextValue = {
  ready: boolean;
  loading: boolean;
  error: string | null;
  cdnBaseUrl: string;
  cdnCacheBust: string;
  items: CreatorEquipmentItem[];
  bundles: readonly EquipmentSetBundle[];
  itemById: Record<string, CreatorEquipmentItem>;
  refresh: () => Promise<void>;
};

const CreatorEquipmentContext = createContext<CreatorEquipmentContextValue | null>(
  null
);

function groupItemsIntoBundles(items: CreatorEquipmentItem[]): EquipmentSetBundle[] {
  const bySet = new Map<string, ItemEquip[]>();
  for (const item of items) {
    const key = item.vanitySet || "standalone";
    const list = bySet.get(key) ?? [];
    list.push(creatorItemToItemEquip(item));
    bySet.set(key, list);
  }

  return Array.from(bySet.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([equipSet, bundleItems]) => ({
      equipSet,
      items: bundleItems
    }));
}

export function CreatorEquipmentProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { ready: authReady, authenticated } = useAuth();
  const { cdnCacheBust } = useCharacterCdnCacheBust();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CreatorEquipmentItem[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const batch = await fetchItemsBatch([...CREATOR_EQUIPMENT_ITEM_IDS]);
      const mapped: CreatorEquipmentItem[] = [];
      for (const id of CREATOR_EQUIPMENT_ITEM_IDS) {
        const raw = batch[id];
        if (!raw) continue;
        const item = apiItemToCreatorItem(raw);
        if (item) mapped.push(item);
      }
      if (!mapped.length) {
        throw new Error("Batch returned no vanity equipment with characterDisplay");
      }
      setItems(mapped);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load equipment from API";
      setItems([]);
      setError(message);
    } finally {
      setLoading(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!authenticated) {
      setItems([]);
      setError("Sign in required to load equipment.");
      setReady(true);
      return;
    }
    void load();
  }, [authReady, authenticated, load]);

  const value = useMemo((): CreatorEquipmentContextValue => {
    const bundles = groupItemsIntoBundles(items);

    const itemById: Record<string, CreatorEquipmentItem> = {};
    for (const item of items) {
      itemById[item.id] = item;
    }

    return {
      ready,
      loading,
      error,
      cdnBaseUrl: getCharacterCdnBaseUrl(),
      cdnCacheBust,
      items,
      bundles,
      itemById,
      refresh: load
    };
  }, [ready, loading, error, items, load, cdnCacheBust]);

  return (
    <CreatorEquipmentContext.Provider value={value}>
      {children}
    </CreatorEquipmentContext.Provider>
  );
}

export function useCreatorEquipment(): CreatorEquipmentContextValue {
  const ctx = useContext(CreatorEquipmentContext);
  if (!ctx) {
    throw new Error("useCreatorEquipment must be used within CreatorEquipmentProvider");
  }
  return ctx;
}
