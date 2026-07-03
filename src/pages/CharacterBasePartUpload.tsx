import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  BASE_PART_COLORS,
  BASE_PART_TYPES,
  buildBasePartFilename,
  buildBasePartObjectKey,
  layerSlugsForBasePart,
  poseKeysForBasePartType,
  type BasePartColor,
  type BasePartType
} from "../config/basePartUploadCatalog";
import { useCharacterBaseSets } from "../context/CharacterBaseSetsContext";
import { useCharacterCdnCacheBust } from "../context/CharacterCdnCacheBustContext";
import BasePartImagePreview from "./characterSets/BasePartImagePreview";
import {
  uploadCharacterBasePartImage,
  type CharacterBasePartImageUploadResult
} from "../services/characterBasePartImageApi";
import { buildCharacterBasePartCdnUrl } from "../utils/characterBasePartCdnUrl";
import classes from "./EquipmentCharacterUpload.module.scss";

const GENDERS = ["male", "female"] as const;

const CharacterBasePartUpload = () => {
  const { cdnBaseUrl, cdnCacheBust } = useCharacterBaseSets();
  const { bumpCdnCacheBust, withCdnCacheBust } = useCharacterCdnCacheBust();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [color, setColor] = useState<BasePartColor>("white");
  const [partType, setPartType] = useState<BasePartType>("head");
  const [poseKey, setPoseKey] = useState("all");
  const [layer, setLayer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CharacterBasePartImageUploadResult | null>(null);

  const poseOptions = useMemo(() => poseKeysForBasePartType(partType), [partType]);

  const layerOptions = useMemo(
    () => layerSlugsForBasePart(partType, poseKey),
    [partType, poseKey]
  );

  React.useEffect(() => {
    if (poseOptions.length && !poseOptions.includes(poseKey)) {
      setPoseKey(poseOptions[0]);
    }
  }, [poseOptions, poseKey]);

  React.useEffect(() => {
    if (layerOptions.length && !layerOptions.includes(layer)) {
      setLayer(layerOptions[0]);
    }
  }, [layerOptions, layer]);

  const expectedObjectKey = useMemo(() => {
    if (!layer) return null;
    return buildBasePartObjectKey(gender, color, partType, poseKey, layer);
  }, [gender, color, partType, poseKey, layer]);

  const expectedFilename = useMemo(() => {
    if (!layer) return null;
    return buildBasePartFilename(gender, color, poseKey, layer);
  }, [gender, color, poseKey, layer]);

  const expectedCdnUrl = useMemo(() => {
    if (!expectedFilename) return null;
    return buildCharacterBasePartCdnUrl({
      gender,
      color,
      partType,
      filename: expectedFilename,
      cdnBaseUrl,
      cacheBust: cdnCacheBust
    });
  }, [gender, color, partType, expectedFilename, cdnBaseUrl, cdnCacheBust]);

  const previewUrl = expectedCdnUrl;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!layer.trim()) {
      setError("Layer is required.");
      return;
    }
    if (!file) {
      setError("PNG file is required.");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".png")) {
      setError("File must be a .png");
      return;
    }

    setSubmitting(true);
    try {
      const uploadResult = await uploadCharacterBasePartImage({
        gender,
        color,
        partType,
        poseKey,
        layer: layer.trim(),
        file
      });
      setResult(uploadResult);
      bumpCdnCacheBust();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>Upload base body sprites</h1>
        <p className={classes.lead}>
          Uploads creator base parts (head, body, arms) to DigitalOcean Spaces via the game
          API. Use the admin VPN. Filenames are derived from gender, color, pose, and layer — no
          manual naming.
        </p>
      </header>

      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.row}>
          <label className={classes.field}>
            <span className={classes.label}>Gender</span>
            <select
              className={classes.select}
              value={gender}
              onChange={(ev) => setGender(ev.target.value as "male" | "female")}
            >
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <label className={classes.field}>
            <span className={classes.label}>Skin color</span>
            <select
              className={classes.select}
              value={color}
              onChange={(ev) => setColor(ev.target.value as BasePartColor)}
            >
              {BASE_PART_COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={classes.field}>
          <span className={classes.label}>Part type</span>
          <select
            className={classes.select}
            value={partType}
            onChange={(ev) => setPartType(ev.target.value as BasePartType)}
          >
            {BASE_PART_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className={classes.row}>
          <label className={classes.field}>
            <span className={classes.label}>Pose</span>
            <select
              className={classes.select}
              value={poseKey}
              onChange={(ev) => setPoseKey(ev.target.value)}
            >
              {poseOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className={classes.field}>
            <span className={classes.label}>Layer</span>
            <select
              className={classes.select}
              value={layer}
              onChange={(ev) => setLayer(ev.target.value)}
              disabled={!layerOptions.length}
            >
              {!layerOptions.length && <option value="">No layers for this pose</option>}
              {layerOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
        </div>

        {expectedObjectKey && (
          <p className={classes.hint}>
            Object key: <code>{expectedObjectKey}</code>
          </p>
        )}

        {previewUrl && expectedFilename && (
          <div className={classes.existingPreview}>
            <span className={classes.label}>Current on CDN</span>
            <BasePartImagePreview
              url={previewUrl}
              label={expectedFilename}
              className={classes.uploadPreview}
            />
            <p className={classes.hint}>
              Preview for the selected slot. A ✓ means the sprite is already on the CDN; ✗ means
              nothing uploaded yet for this key.
            </p>
          </div>
        )}

        <label className={classes.field}>
          <span className={classes.label}>PNG file (max 5MB)</span>
          <input
            className={classes.input}
            type="file"
            accept="image/png"
            onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
          />
        </label>

        {error && <p className={classes.error}>{error}</p>}

        <button className={classes.submit} type="submit" disabled={submitting}>
          {submitting ? "Uploading…" : "Upload"}
        </button>
      </form>

      {result && (
        <section className={classes.result}>
          <h2>Upload successful</h2>
          <p>
            <a href={withCdnCacheBust(result.publicUrl)} target="_blank" rel="noreferrer">
              Open CDN image
            </a>
          </p>
          <dl className={classes.dl}>
            <dt>Filename</dt>
            <dd>
              <code>{result.filename}</code>
            </dd>
            <dt>Object key</dt>
            <dd>
              <code>{result.objectKey}</code>
            </dd>
            <dt>suggestedEntry</dt>
            <dd>
              <pre className={classes.pre}>
                {JSON.stringify(result.suggestedEntry, null, 2)}
              </pre>
            </dd>
          </dl>
          {result.publicUrl && (
            <img
              className={classes.preview}
              src={withCdnCacheBust(result.publicUrl)}
              alt={result.filename}
            />
          )}
        </section>
      )}

      <p className={classes.back}>
        <Link to="/upload/equipment">Equipment upload →</Link>
      </p>
    </div>
  );
};

CharacterBasePartUpload.displayName = "CharacterBasePartUpload";

export default CharacterBasePartUpload;
