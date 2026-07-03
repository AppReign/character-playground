import React, { useEffect, useState } from "react";

import classes from "../../components/EquipmentImagePreview.module.scss";
import {
  useCharacterBaseSetValidation,
  type CharacterImageLoadState
} from "./characterBaseSetValidationContext";

type BasePartImagePreviewProps = {
  url: string;
  label: string;
  className?: string;
};

const BasePartImagePreview = ({ url, label, className }: BasePartImagePreviewProps) => {
  const { getUrlStatus } = useCharacterBaseSetValidation();
  const trackedStatus = getUrlStatus(url);
  const [localState, setLocalState] = useState<CharacterImageLoadState>("loading");
  const loadState = trackedStatus !== "loading" ? trackedStatus : localState;

  const updateLocalState = (next: CharacterImageLoadState) => {
    if (trackedStatus !== "loading") return;
    setLocalState(next);
  };

  useEffect(() => {
    setLocalState("loading");
  }, [url]);

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
          alt={loadState === "ok" ? `${label} base part preview` : ""}
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

BasePartImagePreview.displayName = "BasePartImagePreview";

export default BasePartImagePreview;
