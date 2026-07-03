import axios from "axios";

import { BASE_API_URL } from "../config/env";
import type { CharacterBasePartsBundle } from "../types/characterBaseParts";

export async function fetchAllCharacterBaseParts(): Promise<CharacterBasePartsBundle> {
  const response = await axios.get<CharacterBasePartsBundle>(
    `${BASE_API_URL}/api/data/character-base-parts`
  );
  return response.data ?? {};
}
