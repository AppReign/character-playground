# Dragons of the Void — Character Playground

Small React app for previewing a 2D character built from layered PNGs (base body + equipment).

## Quick start (first time)

### 1) Install Node.js + npm

- **Recommended (Mac/Linux)**: install **nvm** (Node Version Manager), then install Node:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
nvm use --lts
node -v
npm -v
```

- **Windows**: install the **LTS** Node.js installer from `https://nodejs.org/`, then confirm:

```bash
node -v
npm -v
```

### 2) Clone the repo and install dependencies

```bash
git clone <REPO_URL_HERE>
cd character
npm install
```

### 3) Run the app

```bash
npm start
```

Then open `http://localhost:3000`.

## Staying up to date (simple rebase workflow)

If you have local changes, either **commit** them (recommended) or **stash** them before updating.

To update your local copy from `master`:

```bash
git fetch origin
git rebase origin/master
```

If you get conflicts: fix the files, then:

```bash
git add .
git rebase --continue
```

To abandon the rebase:

```bash
git rebase --abort
```

## Where the assets live

- **PNGs**: `public/character_parts/…`
- The app loads images by URL like `/character_parts/<filename>.png` (see `src/utils/imageSrcResolver.ts`).

## Useful scripts

```bash
npm start       # dev server
npm run build   # production build (outputs to build/)
npm test        # tests
```

See `DESIGN.md` for architecture notes (some sections may still describe the older JSON + Zod pipeline).

**Equipment data:** TypeScript modules under `src/data/equipmentSets/*.ts` declare full `ItemEquip` objects (typed `layer` keys via `ZIndexLayerKey`) and are merged in `src/data/equipmentRegistry.ts`. The catalog exposed to the app is built in `src/config/allEquipmentItems.ts`.

**Editor checks:** TypeScript + ESLint (see `.eslintrc.json`) validate modern syntax; `layer` and poses are checked at compile time via `ItemEquip` / `CharacterDisplayImageRow`.

