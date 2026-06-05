import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { useCreatorEquipment } from "../../context/CreatorEquipmentContext";
import type { EquipmentSetBundle } from "../../types/equipmentSet";
import { buildEquipmentCdnUrl } from "../../utils/apiCharacterDisplay";
import { checkCdnImageUrls } from "../../utils/checkCdnImage";
import { extractRequiredCharacterImages } from "../../utils/extractCharacterDisplayImages";
import type { BundleValidationResult } from "../../utils/validateEquipmentBundle";
import { validateEquipmentBundle } from "../../utils/validateEquipmentBundle";

export type ValidationMap = Record<string, BundleValidationResult>;

export type EquipmentImageLoadState = "loading" | "ok" | "error";

export type CdnRollupStatus = "pending" | "ok" | "error" | "issue" | "na";

type ItemCdnPlan = {
  itemId: string;
  equipSet: string;
  urls: string[];
};

type ValidationContextValue = {
  validationBySet: ValidationMap;
  bundles: readonly EquipmentSetBundle[];
  cdnChecking: boolean;
  cdnCheckProgress: { checked: number; total: number };
  getUrlStatus: (url: string) => EquipmentImageLoadState;
  getItemCdnStatus: (itemId: string) => CdnRollupStatus;
  getSetCdnStatus: (equipSet: string) => CdnRollupStatus;
};

const ValidationContext = createContext<ValidationContextValue>({
  validationBySet: {},
  bundles: [],
  cdnChecking: false,
  cdnCheckProgress: { checked: 0, total: 0 },
  getUrlStatus: () => "loading",
  getItemCdnStatus: () => "na",
  getSetCdnStatus: () => "na"
});

function buildItemCdnPlans(
  bundles: readonly EquipmentSetBundle[],
  itemById: Record<string, { id: string; itemSetSegment: string; normalizedItemId: string }>,
  cdnBaseUrl: string
): ItemCdnPlan[] {
  const plans: ItemCdnPlan[] = [];
  for (const bundle of bundles) {
    for (const item of bundle.items) {
      const creatorItem = itemById[item.id];
      if (!creatorItem || !item.characterDisplay) continue;
      const refs = extractRequiredCharacterImages(item);
      const urls = new Set<string>();
      for (const ref of refs) {
        urls.add(buildEquipmentCdnUrl(creatorItem, ref, cdnBaseUrl));
      }
      plans.push({
        itemId: item.id,
        equipSet: bundle.equipSet,
        urls: Array.from(urls)
      });
    }
  }
  return plans;
}

function rollupFromCounts(
  total: number,
  ok: number,
  error: number,
  pending: number
): CdnRollupStatus {
  if (total === 0) return "na";
  if (pending > 0) return "pending";
  if (error > 0) return "error";
  if (ok === total) return "ok";
  return "error";
}

export function EquipmentValidationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { ready, bundles, itemById, cdnBaseUrl } = useCreatorEquipment();
  const [cdnChecking, setCdnChecking] = useState(false);
  const [urlStatus, setUrlStatus] = useState<Record<string, EquipmentImageLoadState>>({});
  const checkGeneration = useRef(0);

  const validationBySet = useMemo(() => {
    if (!ready) return {};
    const map: ValidationMap = {};
    for (const bundle of bundles) {
      map[bundle.equipSet] = validateEquipmentBundle(bundle);
    }
    return map;
  }, [ready, bundles]);

  const itemPlans = useMemo(() => {
    if (!ready || !cdnBaseUrl) return [];
    return buildItemCdnPlans(bundles, itemById, cdnBaseUrl);
  }, [ready, bundles, itemById, cdnBaseUrl]);

  const itemUrlsById = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const plan of itemPlans) {
      map[plan.itemId] = plan.urls;
    }
    return map;
  }, [itemPlans]);

  const setItemsBySet = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const bundle of bundles) {
      map[bundle.equipSet] = bundle.items.map((item) => item.id);
    }
    return map;
  }, [bundles]);

  useEffect(() => {
    if (!ready || !cdnBaseUrl || !itemPlans.length) {
      setUrlStatus({});
      setCdnChecking(false);
      return;
    }

    const generation = ++checkGeneration.current;
    const allUrls = Array.from(new Set(itemPlans.flatMap((plan) => plan.urls)));
    const initial: Record<string, EquipmentImageLoadState> = {};
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
  }, [ready, cdnBaseUrl, itemPlans]);

  const cdnCheckProgress = useMemo(() => {
    const statuses = Object.values(urlStatus);
    const total = statuses.length;
    const checked = statuses.filter((status) => status !== "loading").length;
    return { checked, total };
  }, [urlStatus]);

  const getUrlStatus = useMemo(
    () =>
      (url: string): EquipmentImageLoadState =>
        urlStatus[url] ?? "loading",
    [urlStatus]
  );

  const getItemCdnStatus = useMemo(() => {
    return (itemId: string): CdnRollupStatus => {
      const validationRow = Object.values(validationBySet)
        .flatMap((bundle) => bundle.items)
        .find((row) => row.item.id === itemId);
      if (!validationRow?.done) {
        return "issue";
      }

      const urls = itemUrlsById[itemId] ?? [];
      if (!urls.length) return "issue";

      let ok = 0;
      let error = 0;
      let pending = 0;
      for (const url of urls) {
        const status = urlStatus[url] ?? "loading";
        if (status === "ok") ok++;
        else if (status === "error") error++;
        else pending++;
      }
      return rollupFromCounts(urls.length, ok, error, pending);
    };
  }, [validationBySet, itemUrlsById, urlStatus]);

  const getSetCdnStatus = useMemo(() => {
    return (equipSet: string): CdnRollupStatus => {
      const validation = validationBySet[equipSet];
      if (!validation) return "na";

      const itemIds = setItemsBySet[equipSet] ?? [];
      if (!itemIds.length) return "na";

      let hasPending = false;
      let hasError = false;
      let hasIssue = false;
      let okItems = 0;

      for (const itemId of itemIds) {
        const status = getItemCdnStatus(itemId);
        if (status === "pending") hasPending = true;
        else if (status === "error") hasError = true;
        else if (status === "issue") hasIssue = true;
        else if (status === "ok") okItems++;
      }

      if (hasError || hasIssue) return "error";
      if (hasPending) return "pending";
      if (okItems === itemIds.length) return "ok";
      return "error";
    };
  }, [validationBySet, setItemsBySet, getItemCdnStatus]);

  const value = useMemo(
    () => ({
      validationBySet,
      bundles,
      cdnChecking,
      cdnCheckProgress,
      getUrlStatus,
      getItemCdnStatus,
      getSetCdnStatus
    }),
    [
      validationBySet,
      bundles,
      cdnChecking,
      cdnCheckProgress,
      getUrlStatus,
      getItemCdnStatus,
      getSetCdnStatus
    ]
  );

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useEquipmentValidation(): ValidationContextValue {
  return useContext(ValidationContext);
}
