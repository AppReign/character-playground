import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import authService from "../services/AuthService";
import { clearAuthToken, setAuthToken } from "../services/apiClient";
import { fetchUserProfile, UserProfile } from "../services/userApi";
import {
  canAccessCharacterTool,
  canUploadCharacterAssets
} from "../utils/characterToolAccess";

export type AuthState = {
  ready: boolean;
  authenticated: boolean;
  admin: boolean;
  designer: boolean;
  canAccessCharacterTool: boolean;
  canUploadCharacterAssets: boolean;
  profile: UserProfile | null;
  authError: string | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const user = await authService.getUser();
        if (!user || user.expired) {
          await authService.login();
          return;
        }

        setAuthToken(user.access_token);
        const loaded = await fetchUserProfile();
        if (cancelled) return;

        if (!loaded) {
          setAuthError("Could not load profile.");
          setReady(true);
          return;
        }

        setProfile(loaded);
        setAuthenticated(true);
        if (!canAccessCharacterTool(loaded)) {
          setAuthError(
            "Your account does not have character-tool access (admin or designer required)."
          );
        }
        setReady(true);
      } catch (err) {
        if (!cancelled) {
          setAuthError(err instanceof Error ? err.message : "Authentication failed");
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(async () => {
    clearAuthToken();
    setAuthenticated(false);
    setProfile(null);
    setAuthError(null);
    setReady(true);
    await authService.logout();
  }, []);

  const toolAccess = canAccessCharacterTool(profile);
  const uploadAccess = canUploadCharacterAssets(profile);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      admin: Boolean(profile?.admin),
      designer: Boolean(profile?.designer),
      canAccessCharacterTool: toolAccess,
      canUploadCharacterAssets: uploadAccess,
      profile,
      authError,
      logout
    }),
    [ready, authenticated, profile, toolAccess, uploadAccess, authError, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
