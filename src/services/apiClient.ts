import axios from "axios";

export const TOKEN_STORAGE_KEY = "token";

export function setAuthToken(accessToken: string): void {
  const bearer = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
  axios.defaults.headers.common.Authorization = bearer;
  localStorage.setItem(TOKEN_STORAGE_KEY, bearer);
}

export function clearAuthToken(): void {
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}
