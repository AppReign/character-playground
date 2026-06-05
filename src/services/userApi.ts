import axios from "axios";

import { BASE_API_URL } from "../config/env";

export type UserProfile = {
  id: string;
  characterName: string;
  admin: boolean;
  designer: boolean;
};

type UserInfoApiResponse = {
  success: boolean;
  payload?: {
    user: {
      id: string;
      characterName?: string;
      admin: boolean;
      designer?: boolean;
    };
  };
};

export async function fetchUserProfile(): Promise<UserProfile | null> {
  const response = await axios.get<UserInfoApiResponse>(`${BASE_API_URL}/api/user/info`);
  if (!response.data.success || !response.data.payload?.user) {
    return null;
  }
  const u = response.data.payload.user;
  return {
    id: u.id,
    characterName: u.characterName ?? "Character name not found",
    admin: Boolean(u.admin),
    designer: Boolean(u.designer)
  };
}
