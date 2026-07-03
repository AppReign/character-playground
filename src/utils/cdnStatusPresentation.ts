import type { CdnBadgeStatus } from "../components/CdnStatusBadge";
import type { CdnRollupStatus } from "./cdnRollupStatus";

type BadgeOptions = {
  /** When true, {@code na} maps to null instead of a badge status. */
  nullForNa?: boolean;
};

export function toCdnBadgeStatus(
  status: CdnRollupStatus,
  options?: BadgeOptions
): CdnBadgeStatus | null {
  switch (status) {
    case "ok":
      return "ok";
    case "pending":
      return "pending";
    case "issue":
      return "issue";
    case "error":
      return "error";
    case "na":
    default:
      return options?.nullForNa ? null : "error";
  }
}

export function isCdnMissing(status: CdnRollupStatus): boolean {
  return status === "error" || status === "issue";
}

export function equipmentSetCdnTitle(status: CdnRollupStatus): string {
  switch (status) {
    case "ok":
      return "All items have every sprite on CDN";
    case "pending":
      return "Checking CDN sprites";
    case "issue":
      return "Some items are missing characterDisplay data";
    case "error":
    default:
      return "Some items are missing sprites on CDN";
  }
}

export function baseSetCdnTitle(status: CdnRollupStatus): string {
  switch (status) {
    case "ok":
      return "All base sprites on CDN";
    case "pending":
      return "Checking CDN sprites";
    case "error":
    default:
      return "Some sprites missing on CDN";
  }
}

export function equipmentItemCdnTitle(status: CdnRollupStatus): string {
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

export function basePartCdnTitle(status: CdnRollupStatus): string {
  switch (status) {
    case "ok":
      return "All sprites on CDN";
    case "pending":
      return "Checking CDN sprites";
    case "error":
    default:
      return "Some sprites missing on CDN";
  }
}

export function equipmentSetBanner(status: CdnRollupStatus): {
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

export function baseSetBanner(status: CdnRollupStatus): {
  label: string;
  dataStatus: "pending" | "ok" | "error";
} {
  switch (status) {
    case "ok":
      return { label: "All sprites on CDN", dataStatus: "ok" };
    case "pending":
      return { label: "Checking CDN sprites…", dataStatus: "pending" };
    case "error":
    default:
      return { label: "Some sprites missing on CDN", dataStatus: "error" };
  }
}
