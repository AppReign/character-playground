import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  characterBaseSetsFromBundle,
  type CharacterBaseSetDefinition
} from "../config/characterBaseSets";
import { getCharacterCdnBaseUrl } from "../config/characterCdn";
import { fetchAllCharacterBaseParts } from "../services/characterBasePartsApi";
import type {
  CharacterBasePartsBundle,
  CharacterBasePartsVariant
} from "../types/characterBaseParts";
import { useAuth } from "./AuthContext";
import { useCharacterCdnCacheBust } from "./CharacterCdnCacheBustContext";

type CharacterBaseSetsContextValue = {
  ready: boolean;
  loading: boolean;
  error: string | null;
  bundle: CharacterBasePartsBundle;
  sets: CharacterBaseSetDefinition[];
  variantsBySetId: Record<string, CharacterBasePartsVariant | undefined>;
  cdnBaseUrl: string;
  cdnCacheBust: string;
  refresh: () => Promise<void>;
};

const CharacterBaseSetsContext = createContext<CharacterBaseSetsContextValue>({
  ready: false,
  loading: true,
  error: null,
  bundle: {},
  sets: [],
  variantsBySetId: {},
  cdnBaseUrl: getCharacterCdnBaseUrl(),
  cdnCacheBust: "",
  refresh: async () => {}
});

function indexVariantsBySetId(
  bundle: CharacterBasePartsBundle
): Record<string, CharacterBasePartsVariant | undefined> {
  const map: Record<string, CharacterBasePartsVariant | undefined> = {};
  for (const byColor of Object.values(bundle)) {
    for (const variant of Object.values(byColor ?? {})) {
      map[variant.id] = variant;
    }
  }
  return map;
}

export function CharacterBaseSetsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { ready: authReady, authenticated } = useAuth();
  const { cdnCacheBust } = useCharacterCdnCacheBust();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bundle, setBundle] = useState<CharacterBasePartsBundle>({});

  const cdnBaseUrl = getCharacterCdnBaseUrl();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllCharacterBaseParts();
      setBundle(data);
    } catch (err) {
      setBundle({});
      setError(err instanceof Error ? err.message : "Failed to load character base parts");
    } finally {
      setLoading(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!authenticated) {
      setBundle({});
      setError("Sign in required to load character base sets.");
      setReady(true);
      return;
    }
    void load();
  }, [authReady, authenticated, load]);

  const sets = useMemo(() => characterBaseSetsFromBundle(bundle), [bundle]);
  const variantsBySetId = useMemo(() => indexVariantsBySetId(bundle), [bundle]);

  const value = useMemo(
    () => ({
      ready,
      loading,
      error,
      bundle,
      sets,
      variantsBySetId,
      cdnBaseUrl,
      cdnCacheBust,
      refresh: load
    }),
    [ready, loading, error, bundle, sets, variantsBySetId, cdnBaseUrl, cdnCacheBust, load]
  );

  return (
    <CharacterBaseSetsContext.Provider value={value}>
      {children}
    </CharacterBaseSetsContext.Provider>
  );
}

export function useCharacterBaseSets(): CharacterBaseSetsContextValue {
  return useContext(CharacterBaseSetsContext);
}
