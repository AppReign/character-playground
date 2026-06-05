# Character creator — equipment from game API

Equipment is loaded exclusively via:

1. **`src/config/creatorEquipmentItemIds.ts`** — hardcoded vanity item ids (187 today)
2. **`POST /api/data/items/batch`** — hydrated `characterDisplay` on each `ItemEquipment`

There is no local equipment JSON/TS in this repo anymore.

## Adding a new item

1. Upload sprites via `/upload`.
2. Add the item id to `creatorEquipmentItemIds.ts` (under the correct vanity set comment).
3. Optionally add `characterDisplay.meta` in `equipment_data.json` via PR bot.

## Regenerating the id list

From the dotv repo (vanity + display-capable equip slots):

```bash
python3 - <<'PY'
import json
from pathlib import Path
items = json.loads(Path("src/main/resources/json/item/equipment_data.json").read_text())
DISPLAY = {"chest","pants","helm","boots","main-hand","off-hand","gloves"}
for item in sorted(items, key=lambda i: (i.get("vanity",{}).get("vanitySet",""), i["id"])):
    v = item.get("vanity") or {}
    if v.get("isVanity") and item.get("equipSlot") in DISPLAY:
        print(f'  "{item["id"]}",  # {v.get("vanitySet")}')
PY
```
