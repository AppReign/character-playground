# Character base parts — head & hair customization (planned)

Phase 2 for **head styles** and **hair styles**. Not in the current creator pipeline.

**Phase 1 (this repo):** head, body, arms from `GET /api/data/character-base-parts`. Playground renders head + body + arms; no hair layer until phase 2.

Server design doc: `dotv/docs/character-base-parts-customization.md` (same plan on both repos).

## Head (planned)

- Multiple faces per **gender + skin color**
- `styleId` nest under `parts.head`
- Phase 1 head PNGs become `styleId: "default"` at migration

## Hair (planned)

- Multiple styles per **gender**
- **`over`** + **`under`** per style (`BODY_HAIR_OVER` / `BODY_HAIR_UNDER`)
- Client picks layer based on helm; server emits both
- Do not upload interim single-layer hair to CDN before this phase

## Shared when implemented

- Upload: `styleId` param for head/hair
- Filename: `{gender}-{color}-{styleId}-{poseSlug}-{layerSlug}.png`
- Profile: `headStyleId`, `hairStyleId`
- Playground pickers + helm-aware hair render

Layer keys `BODY.HAIR.*` remain in `src/layers/baseLayer.ts` for future use.
