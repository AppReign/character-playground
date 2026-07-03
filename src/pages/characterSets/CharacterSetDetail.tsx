import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import CdnCheckProgress from "../../components/CdnCheckProgress";
import CdnStatusBadge from "../../components/CdnStatusBadge";
import { findCharacterBaseSet } from "../../config/characterBaseSets";
import { useAuth } from "../../context/AuthContext";
import { useCharacterBaseSets } from "../../context/CharacterBaseSetsContext";
import BasePartImagePreview from "./BasePartImagePreview";
import { useCharacterBaseSetValidation } from "./characterBaseSetValidationContext";
import { extractBasePartImageRefs } from "../../utils/extractBasePartImageRefs";
import {
  basePartCdnTitle,
  baseSetBanner,
  toCdnBadgeStatus
} from "../../utils/cdnStatusPresentation";
import progressClasses from "../../components/CdnCheckProgress.module.scss";
import classes from "../equipmentSets/EquipmentSetDetail.module.scss";

const PART_TYPE_ORDER = ["head", "body", "mainHand", "offHand"] as const;

const CharacterSetDetail = () => {
  const { canUploadCharacterAssets } = useAuth();
  const { setId } = useParams<{ setId: string }>();
  const { bundle, variantsBySetId, cdnBaseUrl, cdnCacheBust, error, loading, refresh } =
    useCharacterBaseSets();
  const set = findCharacterBaseSet(bundle, setId);
  const { getSetCdnStatus, getPartTypeCdnStatus, cdnCheckProgress } =
    useCharacterBaseSetValidation();

  const variant = setId ? variantsBySetId[setId] : undefined;

  const refs = useMemo(() => {
    if (!variant) return [];
    return extractBasePartImageRefs(variant, cdnBaseUrl, cdnCacheBust);
  }, [variant, cdnBaseUrl, cdnCacheBust]);

  const refsByPartType = useMemo(() => {
    const map = new Map<string, typeof refs>();
    for (const ref of refs) {
      const list = map.get(ref.partType) ?? [];
      list.push(ref);
      map.set(ref.partType, list);
    }
    return map;
  }, [refs]);

  const sortedPartTypes = useMemo(() => {
    const present = Array.from(refsByPartType.keys());
    return [
      ...PART_TYPE_ORDER.filter((partType) => present.includes(partType)),
      ...present.filter((partType) => !PART_TYPE_ORDER.includes(partType as typeof PART_TYPE_ORDER[number])).sort()
    ];
  }, [refsByPartType]);

  if (!setId || !set) {
    return <Navigate to="/character-sets" replace />;
  }

  if (!variant) {
    return null;
  }

  const setBadge = baseSetBanner(getSetCdnStatus(setId));
  const showProgress = cdnCheckProgress.checked < cdnCheckProgress.total;

  return (
    <div className={classes.detail}>
      <header className={classes.header}>
        <h1 className={classes.title}>{set.label}</h1>
        <p className={classes.meta}>
          <code className={classes.code}>{set.id}</code>
          <span className={classes.dot} aria-hidden>
            ·
          </span>
          {refs.length} sprite{refs.length !== 1 ? "s" : ""}
          <span className={classes.dot} aria-hidden>
            ·
          </span>
          <span>CDN previews</span>
        </p>
        {error && (
          <p className={classes.warn}>
            API: {error}{" "}
            <button type="button" className={classes.refreshBtn} onClick={() => void refresh()}>
              Retry
            </button>
          </p>
        )}
        {loading && <p className={classes.summaryMuted}>Loading character base sets…</p>}
        {showProgress && (
          <div className={progressClasses.detailWrap}>
            <CdnCheckProgress
              checked={cdnCheckProgress.checked}
              total={cdnCheckProgress.total}
              variant="inline"
            />
          </div>
        )}
        <div className={classes.bundleSummary}>
          <span className={classes.summaryBadge} data-status={setBadge.dataStatus}>
            {setBadge.dataStatus === "pending" && (
              <span className={classes.summarySpinner} aria-hidden />
            )}
            {setBadge.label}
          </span>
          <span className={classes.summaryMuted}>
            {refs.length} expected layers from API hydrator
          </span>
        </div>
      </header>

      <ul className={classes.itemList}>
        {sortedPartTypes.map((partType) => {
          const partRefs = refsByPartType.get(partType) ?? [];
          const partStatus = getPartTypeCdnStatus(setId, partType);
          const needsAttention = partStatus !== "ok";

          return (
            <li key={partType}>
              <details className={classes.details} open={needsAttention}>
                <summary className={classes.itemSummary}>
                  <span className={classes.itemTitle}>
                    <CdnStatusBadge
                      status={toCdnBadgeStatus(partStatus) ?? "error"}
                      title={basePartCdnTitle(partStatus)}
                      size="md"
                    />
                    <span className={classes.itemName}>{partType}</span>
                  </span>
                  <span className={classes.itemSlot}>
                    {partRefs.length} layer{partRefs.length !== 1 ? "s" : ""}
                  </span>
                  {canUploadCharacterAssets && (
                    <Link
                      className={classes.uploadLink}
                      to="/upload/base-parts"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upload
                    </Link>
                  )}
                </summary>

                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th>Preview</th>
                      <th>Pose / layer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partRefs.map((ref) => (
                      <tr key={`${ref.poseKey}-${ref.layer}-${ref.filename}`}>
                        <td className={classes.fileCell}>
                          <BasePartImagePreview url={ref.url} label={ref.filename} />
                          <code className={classes.fileCode}>{ref.filename}</code>
                        </td>
                        <td className={classes.usageCell}>
                          <div className={classes.usageLine}>
                            <span className={classes.usagePose}>{ref.poseKey}</span>
                            <span className={classes.usageLayer}>{ref.layer}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

CharacterSetDetail.displayName = "CharacterSetDetail";

export default CharacterSetDetail;
