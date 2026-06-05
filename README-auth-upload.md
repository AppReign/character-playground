# Authentication & sprite upload

## Hosts

| Environment | App URL | OIDC client |
|-------------|---------|-------------|
| Local | `http://localhost:3000` | `dotv-creator-local` |
| Stage | `https://creator-stage.dragonsofthevoid.com` | `dotv-creator-stage` |
| Prod | `https://creator.dragonsofthevoid.com` | `dotv-creator` |

Clients are registered in `dotv-login/Clients.cs` (deploy IdentityServer after changing).

## Requirements

- Game account with **`admin`** or **`designer`** on the user document (Mongo). Designers must **not** use `admin: true` — that unlocks admin-tool and other `/api/admin/*` routes.
- **VPN** so API requests include `do-connecting-ip` matching `vpn.adminip` (same as admin-tool)
- Target API env: stage host → `api-stage`; prod host → `api`

### Granting designer access

Set `designer: true` on the user in Mongo (leave `admin: false`). Example:

```js
db.users.updateOne({ _id: "USER_ID" }, { $set: { designer: true } })
```

(Collection name may differ — use your existing user store.)

## Environment configuration

Config lives in `src/config/dotvEnv.ts` and is set via CRA env files:

| Command | Env file | API | Login |
|---------|----------|-----|-------|
| `npm start` | `.env.development` | `api-stage` | `login-stage` |
| `npm run start:stage` | `.env.staging` | `api-stage` | `login-stage` |
| `npm run build:stage` | `.env.staging` | `api-stage` | `login-stage` |
| `npm run build` | `.env.production` | `api` | `login` |

Override locally with `.env.development.local` (gitignored).

```bash
# optional — point at local game API
echo 'REACT_APP_API_URL=http://localhost:8082' >> .env.development.local
```

Restart the dev server after changing env files. Dev console logs `[creator] environment` with resolved URLs.

On `localhost`, OIDC always uses `dotv-creator-local` (even for `start:stage`) so the callback stays on your machine.

## Local dev

```bash
npm install
npm start
```

`npm install` uses `.npmrc` (`legacy-peer-deps=true`) because Create React App 5 declares a TypeScript 4 peer while this project uses TypeScript 5. The build is verified with that setting.

Opens `http://localhost:3000` → OIDC redirect → `callback.html` → app.

Upload: **Upload** nav or per-item link on equipment set detail → `POST /api/admin/equipment-character-image`.

## Deploy

1. Deploy `dotv-login` with new clients.
2. DNS + TLS for `creator` / `creator-stage` subdomains.
3. `npm run build` (prod) or `npm run build:stage` and publish `build/` to static hosting.
