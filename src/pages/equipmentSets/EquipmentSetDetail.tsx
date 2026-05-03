import React, { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { equipmentSetBundles } from "../../data/equipmentRegistry";
import type { ExtractedImageRef } from "../../utils/extractCharacterDisplayImages";
import { uniqueFilenames } from "../../utils/extractCharacterDisplayImages";
import { getCharacterPartPublicUrl } from "../../utils/characterPartUrl";
import { formatEquipSetLabel } from "../../utils/formatEquipSetLabel";
import { useEquipmentValidation } from "./equipmentValidationContext";
import classes from "./EquipmentSetDetail.module.scss";

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

const EquipmentSetDetail = () => {
  const { equipSetId } = useParams<{ equipSetId: string }>();
  const { validationBySet } = useEquipmentValidation();

  const bundle = useMemo(
    () => equipmentSetBundles.find((b) => b.equipSet === equipSetId),
    [equipSetId]
  );

  const validation = equipSetId ? validationBySet[equipSetId] : undefined;

  if (!equipSetId || !bundle) {
    return <Navigate to="/equipment-sets" replace />;
  }

  if (!validation) {
    return null;
  }

  const v = validation;

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
        </p>
        <div className={classes.bundleSummary}>
          <span
            className={classes.summaryBadge}
            data-status={v.allItemsDone ? "ok" : "issue"}
          >
            {v.allItemsDone
              ? "All items have valid characterDisplay"
              : `${v.itemsMissingValidDisplay} item${v.itemsMissingValidDisplay !== 1 ? "s" : ""} missing valid characterDisplay`}
          </span>
          <span className={classes.summaryMuted}>
            {v.itemsWithValidDisplay} valid · {v.itemsMissingValidDisplay} incomplete
          </span>
        </div>
      </header>

      <ul className={classes.itemList}>
        {v.items.map((row) => {
          const refsByFile = groupRefsByFilename(row.refs);
          const needsAttention = !row.done;
          const files = uniqueFilenames(row.refs);

          return (
            <li key={row.item.id}>
              <details className={classes.details} open={needsAttention}>
                <summary className={classes.itemSummary}>
                  <span className={classes.itemTitle}>
                    <span
                      className={classes.itemStatus}
                      data-status={row.done ? "ok" : "issue"}
                      title={
                        row.done
                          ? "Valid characterDisplay"
                          : "Missing or empty characterDisplay"
                      }
                    >
                      {row.done ? "✓" : "!"}
                    </span>
                    <span className={classes.itemName}>{row.item.name}</span>
                  </span>
                  <span className={classes.itemSlot}>{row.item.equipSlot}</span>
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
                        <th>File</th>
                        <th>Layers / poses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((filename) => {
                        const refs = refsByFile.get(filename) ?? [];
                        const url = getCharacterPartPublicUrl(filename);
                        return (
                          <tr key={filename}>
                            <td className={classes.fileCell}>
                              <code className={classes.fileCode}>
                                {filename}.png
                              </code>
                              <a
                                className={classes.fileLink}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open
                              </a>
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
