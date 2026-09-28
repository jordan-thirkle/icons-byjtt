import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, "metadata/icons.json"), "utf8"));
const icons = meta.icons;

function normaliseSvg(svg) { return svg.replace(/\s+/g, " ").trim(); }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function inspect(svg) {
  const viewBox = svg.match(/viewBox=["']([^"']+)["']/i)?.[1] ?? "";
  const hasCurrentColor = /(?:stroke|fill)=["']currentColor["']/i.test(svg);
  const hasSolidFill = /fill=["'](?!none|currentColor)[^"']+["']/i.test(svg);
  const shapeCount = (svg.match(/<(?:path|circle|rect|line|polyline|polygon|ellipse)\b/gi) ?? []).length;
  const paths = (svg.match(/<path\b/gi) ?? []).length;
  const circles = (svg.match(/<circle\b/gi) ?? []).length;
  const rects = (svg.match(/<rect\b/gi) ?? []).length;
  return { viewBox, hasCurrentColor, hasSolidFill, shapeCount, paths, circles, rects };
}

const records = icons.map((icon) => {
  const file = path.join(ROOT, icon.path.replace(/^\//, ""));
  const svg = fs.readFileSync(file, "utf8");
  return { ...icon, svg, inspection: inspect(svg), fingerprint: hash(normaliseSvg(svg)) };
});

test("300-icon visual/semantic audit inventory is complete", () => {
  assert.equal(records.length, 300);
  assert.equal(new Set(records.map((r) => r.name)).size, 300);
  for (const r of records) {
    assert.equal(r.inspection.viewBox, "0 0 24 24", r.name);
    assert.ok(r.inspection.shapeCount > 0, r.name);
  }
});

test("all canonical icons use the intended 24px SVG family contract", () => {
  const bad = records.filter((r) => !r.inspection.hasCurrentColor || r.inspection.hasSolidFill);
  assert.deepEqual(bad.map((r) => r.name), []);
});

test("report exact duplicate geometry across distinct canonical identities", () => {
  const groups = new Map();
  for (const r of records) {
    const list = groups.get(r.fingerprint) ?? [];
    list.push(r.name);
    groups.set(r.fingerprint, list);
  }
  const duplicates = [...groups.values()].filter((g) => g.length > 1);
  if (duplicates.length) {
    console.log("\nEXACT GEOMETRY DUPLICATES:");
    for (const group of duplicates) console.log("- " + group.join(", "));
  }
  assert.equal(duplicates.length, 0, "distinct canonical icons must not share identical SVG geometry");
});

test("report suspicious placeholder-level geometry", () => {
  const suspicious = records.filter((r) =>
    r.inspection.shapeCount === 1 &&
    ((r.inspection.circles === 1 && r.inspection.paths === 0) ||
     (r.inspection.rects === 1 && r.inspection.paths === 0))
  );
  if (suspicious.length) {
    console.log("\nSINGLE-SHAPE CIRCLE/RECT CANDIDATES:");
    for (const r of suspicious) console.log("- " + r.name + " [" + r.category + "]");
  }
  assert.equal(suspicious.length, 0, "single-shape circle/rect placeholders require explicit review");
});
