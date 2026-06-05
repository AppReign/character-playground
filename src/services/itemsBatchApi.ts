import axios from "axios";

import { BASE_API_URL } from "../config/env";
import type { ApiItemEquipment } from "../types/apiItemEquipment";

export async function fetchItemsBatch(
  itemIds: string[]
): Promise<Record<string, ApiItemEquipment>> {
  const response = await axios.post<Record<string, ApiItemEquipment>>(
    `${BASE_API_URL}/api/data/items/batch`,
    itemIds
  );
  return response.data ?? {};
}
