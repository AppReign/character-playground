import React from "react";

import classes from "./CdnCheckProgress.module.scss";

type CdnCheckProgressProps = {
  checked: number;
  total: number;
  label?: string;
  variant?: "sidebar" | "inline";
};

const CdnCheckProgress = ({
  checked,
  total,
  label = "Checking CDN sprites",
  variant = "sidebar"
}: CdnCheckProgressProps) => {
  if (total <= 0) return null;

  const complete = checked >= total;
  const pct = Math.min(100, Math.round((checked / total) * 100));

  return (
    <div
      className={[classes.wrap, variant === "inline" ? classes.inline : ""]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-busy={!complete}
    >
      <div className={classes.row}>
        {!complete && <span className={classes.spinner} aria-hidden />}
        <span className={classes.label}>
          {complete ? "CDN check complete" : label}
        </span>
        <span className={classes.count}>
          {checked}/{total}
        </span>
      </div>
      <div
        className={classes.track}
        aria-hidden
      >
        <div
          className={classes.bar}
          data-complete={complete ? "true" : "false"}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

CdnCheckProgress.displayName = "CdnCheckProgress";

export default CdnCheckProgress;
