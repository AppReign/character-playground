import axios from "axios";

import { BASE_API_URL } from "../config/env";
import type { CharacterDisplaySuggestedEntry } from "./equipmentCharacterImageApi";
import type { BasePartColor, BasePartType } from "../config/basePartUploadCatalog";

export type CharacterBasePartImageUploadResult = {
  objectKey: string;
  filename: string;
  directory: string;
  publicUrl: string;
  gender: string;
  color: string;
  partType: string;
  poseKey: string;
  layer: string;
  suggestedEntry: CharacterDisplaySuggestedEntry;
};

type UploadApiResponse = {
  success: boolean;
  payload?: CharacterBasePartImageUploadResult;
  errorMsg?: string;
};

export type UploadCharacterBasePartImageParams = {
  gender: "male" | "female";
  color: BasePartColor;
  partType: BasePartType;
  poseKey: string;
  layer: string;
  file: File;
};

export async function uploadCharacterBasePartImage(
  params: UploadCharacterBasePartImageParams
): Promise<CharacterBasePartImageUploadResult> {
  const form = new FormData();
  form.append("gender", params.gender);
  form.append("color", params.color);
  form.append("partType", params.partType);
  form.append("poseKey", params.poseKey);
  form.append("layer", params.layer);
  form.append("file", params.file);

  try {
    const response = await axios.post<UploadApiResponse>(
      `${BASE_API_URL}/api/admin/character-base-part-image`,
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
