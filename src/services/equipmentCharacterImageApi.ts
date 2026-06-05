import axios from "axios";

import { BASE_API_URL } from "../config/env";

export type CharacterDisplaySuggestedEntry = {
  filename: string;
  layer: string;
};

export type EquipmentCharacterImageUploadResult = {
  objectKey: string;
  filename: string;
  normalizedItemId: string;
  directory: string;
  publicUrl: string;
  equipSlot: string;
  itemSetSegment: string;
  poseKey: string;
  layer: string;
  suggestedEntry: CharacterDisplaySuggestedEntry;
};

type UploadApiResponse = {
  success: boolean;
  payload?: EquipmentCharacterImageUploadResult;
  errorMsg?: string;
};

export type UploadEquipmentCharacterImageParams = {
  itemId: string;
  gender: "male" | "female";
  poseKey: string;
  layer: string;
  file: File;
};

export async function uploadEquipmentCharacterImage(
  params: UploadEquipmentCharacterImageParams
): Promise<EquipmentCharacterImageUploadResult> {
  const form = new FormData();
  form.append("itemId", params.itemId);
  form.append("gender", params.gender);
  form.append("poseKey", params.poseKey);
  form.append("layer", params.layer);
  form.append("file", params.file);

  try {
    const response = await axios.post<UploadApiResponse>(
      `${BASE_API_URL}/api/admin/equipment-character-image`,
      form
    );

    if (!response.data.success || !response.data.payload) {
      const message = response.data.errorMsg || "Upload failed";
      throw new Error(message);
    }

    return response.data.payload;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const data = err.response.data as UploadApiResponse & { errorMsg?: string };
      if (data.errorMsg) {
        throw new Error(data.errorMsg);
      }
    }
    throw err;
  }
}
