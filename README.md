# Dragons of the Void — Character Playground

React app for previewing 2D character layers: **base body** (M01) plus **equipment** from item definitions, with z-order from `zIndex` and named layer maps (`EQUIPMENT`, `BODY`).

Live site: [dragonsofthevoid.com](https://dragonsofthevoid.com/) (see `homepage` in `package.json`).

## Assets

PNG layers live under `public/character_parts/` (and subfolders per set). The app resolves URLs like `/character_parts/<filename>.png` via `src/utils/imageSrcResolver.ts`.

## Configuration

- **`src/config.ts`** — wires `partTypes` and `parts` into the main `Config`.
- **`src/config/partTypes.ts`** — part categories shown in the UI.
- **`src/config/parts.ts`** — combines **`partsBase`** (base body) and **`allEquipmentItems`** (equipment catalog).
- **`src/config/baseLayer.ts`** — `BODY` layer ids for base sprites (paired with `zIndex`).
- **`src/config/equipmentLayer.ts`** — `EQUIPMENT` layer ids for equipped gear.
- **`src/config/zIndex.ts`** — numeric draw order for each layer key.
- **`src/interfaces/Config.ts`** — types for parts, images, equipment POC rows.

Equipment item data is split under `src/equipment/` and aggregated in `src/config/allEquipmentItems.ts`.

## Scripts

### `npm start`

Runs the app in development. Open [http://localhost:3000](http://localhost:3000). The page reloads when you edit source files.

### `npm run build`

Produces an optimized bundle in the `build/` folder (CRA). Static files from `public/` are copied into `build/`.

### `npm run deploy`

Runs `npm run build` then publishes `build/` with `gh-pages`. Adjust or remove if your hosting setup differs.

### `npm test`

Runs the test watcher (React Testing Library / Jest).
