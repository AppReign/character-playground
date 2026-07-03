import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { appendCharacterCdnCacheBust } from "../config/characterCdn";

function newCacheBustId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type CharacterCdnCacheBustContextValue = {
  cdnCacheBust: string;
  bumpCdnCacheBust: () => void;
  withCdnCacheBust: (url: string) => string;
};

const CharacterCdnCacheBustContext =
  createContext<CharacterCdnCacheBustContextValue | null>(null);

export function CharacterCdnCacheBustProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [cdnCacheBust, setCdnCacheBust] = useState(newCacheBustId);

  const bumpCdnCacheBust = useCallback(() => {
    setCdnCacheBust(newCacheBustId());
  }, []);

  const withCdnCacheBust = useCallback(
    (url: string) => appendCharacterCdnCacheBust(url, cdnCacheBust),
    [cdnCacheBust]
  );

  const value = useMemo(
    () => ({
      cdnCacheBust,
      bumpCdnCacheBust,
      withCdnCacheBust
    }),
    [cdnCacheBust, bumpCdnCacheBust, withCdnCacheBust]
  );

  return (
    <CharacterCdnCacheBustContext.Provider value={value}>
      {children}
    </CharacterCdnCacheBustContext.Provider>
  );
}

export function useCharacterCdnCacheBust(): CharacterCdnCacheBustContextValue {
  const ctx = useContext(CharacterCdnCacheBustContext);
  if (!ctx) {
    throw new Error(
      "useCharacterCdnCacheBust must be used within CharacterCdnCacheBustProvider"
    );
  }
  return ctx;
}
