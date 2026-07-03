/** Pose key → filename slug (e.g. {@code "1h mainhand"} → {@code "1h-mainhand"}). */
export function poseKeyToSlug(poseKey: string): string {
  return poseKey.trim().toLowerCase().replace(/ /g, "-");
}
