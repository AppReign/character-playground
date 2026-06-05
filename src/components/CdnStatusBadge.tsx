import React from "react";

import classes from "./CdnStatusBadge.module.scss";

export type CdnBadgeStatus = "pending" | "ok" | "error" | "issue";

type CdnStatusBadgeProps = {
  status: CdnBadgeStatus;
  title?: string;
  size?: "sm" | "md";
  className?: string;
};

const CdnStatusBadge = ({
  status,
  title,
  size = "sm",
  className
}: CdnStatusBadgeProps) => {
  return (
    <span
      className={[classes.badge, classes[size], className].filter(Boolean).join(" ")}
      data-status={status}
      title={title}
      aria-busy={status === "pending"}
      aria-label={title}
    >
      {status === "pending" ? (
        <span className={classes.spinner} aria-hidden />
      ) : status === "ok" ? (
        "✓"
      ) : (
        "✗"
      )}
    </span>
  );
};

CdnStatusBadge.displayName = "CdnStatusBadge";

export default CdnStatusBadge;
