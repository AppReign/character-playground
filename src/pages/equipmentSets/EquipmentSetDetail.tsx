import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import EquipmentImagePreview from "../../components/EquipmentImagePreview";
import CdnCheckProgress from "../../components/CdnCheckProgress";
import CdnStatusBadge, { type CdnBadgeStatus } from "../../components/CdnStatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useCreatorEquipment } from "../../context/CreatorEquipmentContext";

import type { EquipSlot } from "../../config/equipSlots";
import type { ExtractedImageRef } from "../../utils/extractCharacterDisplayImages";
import { uniqueFilenames } from "../../utils/extractCharacterDisplayImages";
import { getCharacterPartPublicUrl } from "../../utils/characterPartUrl";
import { buildEquipmentCdnUrl } from "../../utils/apiCharacterDisplay";
import type { CreatorEquipmentItem } from "../../utils/apiCharacterDisplay";
import { formatEquipSetLabel } from "../../utils/formatEquipSetLabel";
import {
  useEquipmentValidation,
  type CdnRollupStatus
} from "./equipmentValidationContext";
import type { ItemValidationResult } from "../../utils/validateEquipmentBundle";
import progressClasses from "../../components/CdnCheckProgress.module.scss";
import classes from "./EquipmentSetDetail.module.scss";

/** Accordion order: helm, chest, main-hand, off-hand, gloves, boots; then pants. */
const DETAIL_ACCORDION_SLOT_ORDER: EquipSlot[] = [
  "helm",
  "chest",
  "main-hand",
  "off-hand",
  "gloves",
  "boots",
  "pants",
];

function compareItemsBySlotThenName(a: ItemValidationResult, b: ItemValidationResult): number {
  const ai = DETAIL_ACCORDION_SLOT_ORDER.indexOf(a.item.equipSlot);
  const bi = DETAIL_ACCORDION_SLOT_ORDER.indexOf(b.item.equipSlot);
  const as = ai === -1 ? DETAIL_ACCORDION_SLOT_ORDER.length : ai;
  const bs = bi === -1 ? DETAIL_ACCORDION_SLOT_ORDER.length : bi;
  if (as !== bs) return as - bs;
  return a.item.name.localeCompare(b.item.name, undefined, { sensitivity: "base" });
}

function groupRefsByFilename(
  refs: ExtractedImageRef[]
): Map<string, ExtractedImageRef[]> {
  const m = new Map<string, ExtractedImageRef[]>();
  for (const r of refs) {
    const arr = m.get(r.filename) ?? [];
    arr.push(r);
    m.set(r.filename, arr);
  }
  return m;
}

function previewUrlForRef(
  cdnBaseUrl: string,
  apiItem: CreatorEquipmentItem | undefined,
  ref: ExtractedImageRef
): string {
  if (apiItem && cdnBaseUrl) {
    return buildEquipmentCdnUrl(apiItem, ref, cdnBaseUrl);
  }
  return getCharacterPartPublicUrl(ref.filename);
}

function badgeStatusForItem(status: CdnRollupStatus): CdnBadgeStatus {
  switch (status) {
    case "ok":
      return "ok";
    case "pending":
      return "pending";
    case "issue":
      return "issue";
    case "error":
    case "na":
    default:
      return "error";
  }
}

function titleForItemStatus(status: CdnRollupStatus): string {
  switch (status) {
    case "ok":
      return "All sprites on CDN";
    case "pending":
      return "Checking CDN sprites";
    case "issue":
      return "Missing or empty characterDisplay";
    case "error":
    case "na":
    default:
      return "Some sprites missing on CDN";
  }
}

function badgeForSetStatus(status: CdnRollupStatus): {
  label: string;
  dataStatus: "pending" | "ok" | "error" | "issue";
} {
  switch (status) {
    case "ok":
      return {
        label: "All items have every sprite on CDN",
        dataStatus: "ok"
      };
    case "pending":
      return {
        label: "Checking CDN sprites…",
        dataStatus: "pending"
      };
    case "issue":
      return {
        label: "Some items missing valid characterDisplay",
        dataStatus: "issue"
      };
    case "error":
    default:
      return {
        label: "Some items missing sprites on CDN",
        dataStatus: "error"
      };
  }
}

const EquipmentSetDetail = () => {
  const { canUploadCharacterAssets } = useAuth();
  const { equipSetId } = useParams<{ equipSetId: string }>();
  const { validationBySet, bundles, getItemCdnStatus, getSetCdnStatus, cdnCheckProgress } =
    useEquipmentValidation();
  const { cdnBaseUrl, itemById, loading, error, refresh } = useCreatorEquipment();

  const bundle = useMemo(
    () => bundles.find((b) => b.equipSet === equipSetId),
    [bundles, equipSetId]
  );

  const validation = equipSetId ? validationBySet[equipSetId] : undefined;

  const sortedItemRows = useMemo(() => {
    if (!validation) return [];
    return [...validation.items].sort(compareItemsBySlotThenName);
  }, [validation]);

  if (!equipSetId || !bundle) {
    return <Navigate to="/equipment-sets" replace />;
  }

  if (!validation) {
    return null;
  }

  const v = validation;
  const setBadge = badgeForSetStatus(getSetCdnStatus(bundle.equipSet));
  const showProgress =
    cdnCheckProgress.checked < cdnCheckProgress.total;

  return (
    <div className={classes.detail}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formatEquipSetLabel(bundle.equipSet)}</h1>
        <p className={classes.meta}>
          <code className={classes.code}>{bundle.equipSet}</code>
          <span className={classes.dot} aria-hidden>
            ·
          </span>
          {bundle.items.length} item{bundle.items.length !== 1 ? "s" : ""}
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
        {loading && <p className={classes.summaryMuted}>Loading equipment from API…</p>}
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
          <span
            className={classes.summaryBadge}
            data-status={setBadge.dataStatus}
          >
            {setBadge.dataStatus === "pending" && (
              <span className={classes.summarySpinner} aria-hidden />
            )}
            {setBadge.label}
          </span>
          <span className={classes.summaryMuted}>
            {v.itemsWithValidDisplay} with display data · {v.itemsMissingValidDisplay}{" "}
            incomplete wiring
          </span>
        </div>
      </header>

      <ul className={classes.itemList}>
        {sortedItemRows.map((row) => {
          const refsByFile = groupRefsByFilename(row.refs);
          const itemStatus = getItemCdnStatus(row.item.id);
          const needsAttention = itemStatus !== "ok";
          const files = uniqueFilenames(row.refs);
          const apiItem = itemById[row.item.id];

          return (
            <li key={row.item.id}>
              <details className={classes.details} open={needsAttention}>
                <summary className={classes.itemSummary}>
                  <span className={classes.itemTitle}>
                    <CdnStatusBadge
                      status={badgeStatusForItem(itemStatus)}
                      title={titleForItemStatus(itemStatus)}
                      size="md"
                    />
                    <span className={classes.itemName}>{row.item.name}</span>
                  </span>
                  <span className={classes.itemSlot}>{row.item.equipSlot}</span>
                  {canUploadCharacterAssets && (
                    <Link
                      className={classes.uploadLink}
                      to={`/upload?itemId=${encodeURIComponent(row.item.id)}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Upload
                    </Link>
                  )}
                </summary>

                {!row.item.characterDisplay ? (
                  <p className={classes.noLayers}>
                    No <code>characterDisplay</code> property.
                  </p>
                ) : row.refs.length === 0 ? (
                  <p className={classes.warn}>
                    <code>characterDisplay</code> is present but has no drawable rows (male /
                    female buckets).
                  </p>
                ) : (
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Layers / poses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((filename) => {
                        const refs = refsByFile.get(filename) ?? [];
                        const ref = refs[0];
                        const url = ref
                          ? previewUrlForRef(cdnBaseUrl, apiItem, ref)
                          : getCharacterPartPublicUrl(filename);
                        return (
                          <tr key={filename}>
                            <td className={classes.fileCell}>
                              <EquipmentImagePreview
                                url={url}
                                label={filename}
                              />
                              <code className={classes.fileCode}>
                                {filename.endsWith(".png") ? filename : `${filename}.png`}
                              </code>
                            </td>
                            <td className={classes.usageCell}>
                              {refs.map((r, i) => (
                                <div
                                  key={`${r.filename}-${i}`}
                                  className={classes.usageLine}
                                >
                                  <span className={classes.usageSex}>{r.sex}</span>
                                  <span className={classes.usagePose}>{r.poseKey}</span>
                                  <span className={classes.usageLayer}>{r.layer}</span>
                                </div>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

EquipmentSetDetail.displayName = "EquipmentSetDetail";

export default EquipmentSetDetail;
