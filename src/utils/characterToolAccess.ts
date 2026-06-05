import type { UserProfile } from "../services/userApi";

/** VPN + admin or designer on the game account (not the same as full admin-tool access). */
export function canAccessCharacterTool(profile: UserProfile | null): boolean {
  if (!profile) return false;
  return profile.admin || profile.designer;
}

/** Sprite upload to Spaces; today matches tool access, may split later. */
export function canUploadCharacterAssets(profile: UserProfile | null): boolean {
  return canAccessCharacterTool(profile);
}
