import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "metadata/micro-0-1.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "metadata/micro-audit.json"), "utf8"));
const canonical = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const canonicalByName = new Map(canonical.icons.map(icon => [icon.name, icon]));

const microPathPattern = /^\/icons\/micro\/[a-z0-9-]+\.svg$/;

function validateSvg(svg, expectedPath) {
  assert.match(svg, /^<svg\b/);
  assert.match(svg, /viewBox=["']0 0 24 24["']/);
  assert.doesNotMatch(svg, /<(image|foreignObject)\b/i);
  assert.match(svg, /fill=["']none["']/);
  assert.match(svg, /stroke=["']currentColor["']/);
  assert.match(svg, /stroke-width=["']2["']/);
  assert.match(svg, /stroke-linecap=["']round["']/);
  assert.match(svg, /stroke-linejoin=["']round["']/);
  assert.match(expectedPath, microPathPattern);
}

test("Micro 0.1 is an explicit derived family, not a second catalogue", () => {
  assert.equal(manifest.family, "micro");
  assert.equal(manifest.status, "experimental");
  assert.equal(manifest.sourceFamily, "line");
  assert.equal(manifest.sourceMaster, "24px canonical geometry");
  assert.deepEqual(manifest.reviewSizes, [12, 16]);
  assert.equal(manifest.icons.length, 8);

  const names = new Set();
  for (const icon of manifest.icons) {
    assert.equal(names.has(icon.name), false, "duplicate Micro name: " + icon.name);
    names.add(icon.name);
    assert.equal(canonicalByName.has(icon.name), true, "missing canonical source: " + icon.name);
    assert.equal(icon.source, canonicalByName.get(icon.name).path);
    assert.match(icon.path, microPathPattern);
    const svg = fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8");
    validateSvg(svg, icon.path);
  }
});

test("Micro 0.1 audit proves every derivative has measurable simplification", () => {
  assert.equal(audit.summary.icons, 8);
  assert.deepEqual(audit.reviewSizes, [12, 16]);
  for (const icon of audit.icons) {
    assert.equal(icon.sourceComplexityScore >= icon.microComplexityScore, true, icon.name + " became more complex");
    assert.equal(icon.complexityReduction > 0 || ["camera", "settings"].includes(icon.name), true, icon.name + " has neither simplification nor an explicit optical rebalancing case");
    assert.equal(manifest.icons.some(entry => entry.name === icon.name), true);
  }
});

test("Micro 0.1 has real-size comparison snapshots at 12px and 16px", () => {
  for (const size of [12, 16]) {
    const file = path.join(root, "visual-snapshots", "micro-0-1-" + size + ".svg");
    assert.equal(fs.existsSync(file), true);
    const snapshot = fs.readFileSync(file, "utf8");
    assert.match(snapshot, new RegExp("Micro 0.1 · Line vs Micro · " + size + "px"));
    assert.equal((snapshot.match(/data-icon="/g) ?? []).length, 8);
    for (const icon of manifest.icons) assert.match(snapshot, new RegExp('data-icon="' + icon.name + '"'));
  }
});
