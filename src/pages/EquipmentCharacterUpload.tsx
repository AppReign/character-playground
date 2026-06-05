import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { layerPresetsForEquipSlot } from "../config/uploadLayerPresets";
import { poseKeysForEquipSlot } from "../config/characterPoseCatalog";
import { useCreatorEquipment } from "../context/CreatorEquipmentContext";
import type { ItemEquip } from "../interfaces/Config";
import {
  uploadEquipmentCharacterImage,
  EquipmentCharacterImageUploadResult
} from "../services/equipmentCharacterImageApi";
import classes from "./EquipmentCharacterUpload.module.scss";

const GENDERS = ["male", "female"] as const;

const EquipmentCharacterUpload = () => {
  const { bundles, refresh } = useCreatorEquipment();
  const [searchParams] = useSearchParams();
  const initialItemId = searchParams.get("itemId") ?? "";

  const [itemId, setItemId] = useState(initialItemId);

  React.useEffect(() => {
    if (initialItemId) {
      setItemId(initialItemId);
    }
  }, [initialItemId]);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [poseKey, setPoseKey] = useState("all");
  const [layer, setLayer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EquipmentCharacterImageUploadResult | null>(null);

  const selectedItem = useMemo((): ItemEquip | undefined => {
    if (!itemId) return undefined;
    for (const bundle of bundles) {
      const item = bundle.items.find((i) => i.id === itemId);
      if (item) return item;
    }
    return undefined;
  }, [itemId, bundles]);

  const poseOptions = useMemo(
    () => (selectedItem ? poseKeysForEquipSlot(selectedItem.equipSlot) : ["all"]),
    [selectedItem]
  );

  const layerOptions = useMemo(
    () => (selectedItem ? layerPresetsForEquipSlot(selectedItem.equipSlot) : []),
    [selectedItem]
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

  const allItems = useMemo(
    () =>
      bundles.flatMap((b) =>
        b.items.map((item) => ({ item, equipSet: b.equipSet }))
      ),
    [bundles]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!itemId.trim()) {
      setError("Item ID is required.");
      return;
    }
    if (!layer.trim()) {
      setError("Layer is required (base, over, or under per slot rules).");
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
      const uploadResult = await uploadEquipmentCharacterImage({
        itemId: itemId.trim(),
        gender,
        poseKey,
        layer: layer.trim(),
        file
      });
      setResult(uploadResult);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>Upload equipment assets</h1>
        <p className={classes.lead}>
          Uploads to DigitalOcean Spaces via the game API. Use the admin VPN. Copy{" "}
          <code>suggestedEntry</code> into <code>equipment_data.json</code> after merge (PR bot
          planned).
        </p>
      </header>

      <form className={classes.form} onSubmit={onSubmit}>
        <label className={classes.field}>
          <span className={classes.label}>Item</span>
          <select
            className={classes.select}
            value={itemId}
            onChange={(ev) => setItemId(ev.target.value)}
          >
            <option value="">Select item…</option>
            {allItems.map(({ item, equipSet }) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.id}) — {equipSet}
              </option>
            ))}
          </select>
        </label>

        {selectedItem && (
          <p className={classes.hint}>
            Slot: <code>{selectedItem.equipSlot}</code>
            {selectedItem.id !== itemId && null}
          </p>
        )}

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
        </div>

        <label className={classes.field}>
          <span className={classes.label}>Layer</span>
          <select
            className={classes.select}
            value={layer}
            onChange={(ev) => setLayer(ev.target.value)}
            disabled={!layerOptions.length}
          >
            {!layerOptions.length && <option value="">Select item first…</option>}
            {layerOptions.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

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
            <a href={result.publicUrl} target="_blank" rel="noreferrer">
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
              src={result.publicUrl}
              alt={result.filename}
            />
          )}
        </section>
      )}

      <p className={classes.back}>
        <Link to="/equipment-sets">← Equipment sets</Link>
      </p>
    </div>
  );
};

EquipmentCharacterUpload.displayName = "EquipmentCharacterUpload";

export default EquipmentCharacterUpload;
