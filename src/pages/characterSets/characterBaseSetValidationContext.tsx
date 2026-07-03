import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { useCharacterBaseSets } from "../../context/CharacterBaseSetsContext";
import { extractBasePartImageRefs } from "../../utils/extractBasePartImageRefs";
import { checkCdnImageUrls } from "../../utils/checkCdnImage";
import { rollupCdnStatusFromCounts, type CdnRollupStatus } from "../../utils/cdnRollupStatus";

export type CharacterImageLoadState = "loading" | "ok" | "error";

type ValidationContextValue = {
  cdnChecking: boolean;
  cdnCheckProgress: { checked: number; total: number };
  getUrlStatus: (url: string) => CharacterImageLoadState;
  getPartTypeCdnStatus: (setId: string, partType: string) => CdnRollupStatus;
  getSetCdnStatus: (setId: string) => CdnRollupStatus;
};

const ValidationContext = createContext<ValidationContextValue>({
  cdnChecking: false,
  cdnCheckProgress: { checked: 0, total: 0 },
  getUrlStatus: () => "loading",
  getPartTypeCdnStatus: () => "na",
  getSetCdnStatus: () => "na"
});

export { type CdnRollupStatus } from "../../utils/cdnRollupStatus";

export function CharacterBaseSetValidationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { ready, variantsBySetId, cdnBaseUrl, cdnCacheBust } = useCharacterBaseSets();
  const [cdnChecking, setCdnChecking] = useState(false);
  const [urlStatus, setUrlStatus] = useState<Record<string, CharacterImageLoadState>>({});
  const checkGeneration = useRef(0);

  const refsBySetId = useMemo(() => {
    if (!ready) return {};
    const map: Record<string, ReturnType<typeof extractBasePartImageRefs>> = {};
    for (const [setId, variant] of Object.entries(variantsBySetId)) {
      if (!variant) continue;
      map[setId] = extractBasePartImageRefs(variant, cdnBaseUrl, cdnCacheBust);
    }
    return map;
  }, [ready, variantsBySetId, cdnBaseUrl, cdnCacheBust]);

  const urlsBySetAndPartType = useMemo(() => {
    const map: Record<string, Record<string, string[]>> = {};
    for (const [setId, refs] of Object.entries(refsBySetId)) {
      const byPart: Record<string, string[]> = {};
      for (const ref of refs) {
        const list = byPart[ref.partType] ?? [];
        list.push(ref.url);
        byPart[ref.partType] = list;
      }
      map[setId] = byPart;
    }
    return map;
  }, [refsBySetId]);

  useEffect(() => {
    if (!ready || !cdnBaseUrl) {
      setUrlStatus({});
      setCdnChecking(false);
      return;
    }

    const allUrls = Array.from(
      new Set(Object.values(refsBySetId).flatMap((refs) => refs.map((ref) => ref.url)))
    );
    if (!allUrls.length) {
      setUrlStatus({});
      setCdnChecking(false);
      return;
    }

    const generation = ++checkGeneration.current;
    const initial: Record<string, CharacterImageLoadState> = {};
    for (const url of allUrls) {
      initial[url] = "loading";
    }
    setUrlStatus(initial);
    setCdnChecking(true);

    void checkCdnImageUrls(allUrls, (url, result) => {
      if (generation !== checkGeneration.current) return;
      setUrlStatus((prev) => ({
        ...prev,
        [url]: result === "ok" ? "ok" : "error"
      }));
    }).finally(() => {
      if (generation === checkGeneration.current) {
        setCdnChecking(false);
      }
    });
  }, [ready, cdnBaseUrl, refsBySetId]);

  const cdnCheckProgress = useMemo(() => {
    const statuses = Object.values(urlStatus);
    const total = statuses.length;
    const checked = statuses.filter((status) => status !== "loading").length;
    return { checked, total };
  }, [urlStatus]);

  const getUrlStatus = useMemo(
    () =>
      (url: string): CharacterImageLoadState =>
        urlStatus[url] ?? "loading",
    [urlStatus]
  );

  const getPartTypeCdnStatus = useMemo(() => {
    return (setId: string, partType: string): CdnRollupStatus => {
      const urls = urlsBySetAndPartType[setId]?.[partType] ?? [];
      if (!urls.length) return "na";

      let ok = 0;
      let error = 0;
      let pending = 0;
      for (const url of urls) {
        const status = urlStatus[url] ?? "loading";
        if (status === "ok") ok++;
        else if (status === "error") error++;
        else pending++;
      }
      return rollupCdnStatusFromCounts(urls.length, ok, error, pending);
    };
  }, [urlsBySetAndPartType, urlStatus]);

  const getSetCdnStatus = useMemo(() => {
    return (setId: string): CdnRollupStatus => {
      const refs = refsBySetId[setId] ?? [];
      if (!refs.length) return "na";

      let ok = 0;
      let error = 0;
      let pending = 0;
      for (const ref of refs) {
        const status = urlStatus[ref.url] ?? "loading";
        if (status === "ok") ok++;
        else if (status === "error") error++;
        else pending++;
      }
      return rollupCdnStatusFromCounts(refs.length, ok, error, pending);
    };
  }, [refsBySetId, urlStatus]);

  const value = useMemo(
    () => ({
      cdnChecking,
      cdnCheckProgress,
      getUrlStatus,
      getPartTypeCdnStatus,
      getSetCdnStatus
    }),
    [cdnChecking, cdnCheckProgress, getUrlStatus, getPartTypeCdnStatus, getSetCdnStatus]
  );

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useCharacterBaseSetValidation(): ValidationContextValue {
  return useContext(ValidationContext);
}
