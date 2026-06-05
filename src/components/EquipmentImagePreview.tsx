import React, { useEffect, useState } from "react";

import classes from "./EquipmentImagePreview.module.scss";
import {
  useEquipmentValidation,
  type EquipmentImageLoadState
} from "../pages/equipmentSets/equipmentValidationContext";

export type { EquipmentImageLoadState };

type EquipmentImagePreviewProps = {
  url: string;
  label: string;
  className?: string;
  onStateChange?: (state: EquipmentImageLoadState) => void;
};

const EquipmentImagePreview = ({
  url,
  label,
  className,
  onStateChange
}: EquipmentImagePreviewProps) => {
  const { getUrlStatus } = useEquipmentValidation();
  const trackedStatus = getUrlStatus(url);
  const [localState, setLocalState] = useState<EquipmentImageLoadState>("loading");
  const loadState = trackedStatus !== "loading" ? trackedStatus : localState;

  useEffect(() => {
    onStateChange?.(loadState);
  }, [loadState, onStateChange]);

  const updateLocalState = (next: EquipmentImageLoadState) => {
    if (trackedStatus !== "loading") return;
    setLocalState(next);
    onStateChange?.(next);
  };

  return (
    <div className={[classes.wrap, className].filter(Boolean).join(" ")}>
      <a
        className={classes.link}
        href={url}
        target="_blank"
        rel="noreferrer"
        title={`Open ${label} in a new tab`}
      >
        <img
          className={loadState === "ok" ? classes.img : classes.imgHidden}
          src={url}
          alt={loadState === "ok" ? `${label} equipment layer preview` : ""}
          loading="lazy"
          onLoad={() => updateLocalState("ok")}
          onError={() => updateLocalState("error")}
        />
        {loadState === "error" && (
          <span className={classes.missing} aria-label="Missing on CDN">
            ✗
          </span>
        )}
        {loadState === "loading" && (
          <span className={classes.loading} aria-label="Checking CDN">
            <span className={classes.spinner} aria-hidden />
          </span>
        )}
      </a>
      <span
        className={classes.badge}
        data-status={loadState === "ok" ? "ok" : loadState === "error" ? "error" : "loading"}
        title={
          loadState === "ok"
            ? "On CDN"
            : loadState === "error"
              ? "Not on CDN"
              : "Checking CDN"
        }
      >
        {loadState === "ok" ? "✓" : loadState === "error" ? "✗" : (
          <span className={classes.badgeSpinner} aria-hidden />
        )}
      </span>
    </div>
  );
};

EquipmentImagePreview.displayName = "EquipmentImagePreview";

export default EquipmentImagePreview;
