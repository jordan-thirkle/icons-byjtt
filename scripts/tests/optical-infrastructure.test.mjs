import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import core100 from "../../metadata/core-100.json" with { type: "json" };

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-rules.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-audit.json"), "utf8"));

test("optical infrastructure covers the full catalogue at every review size", () => {
  assert.deepEqual(rules.reviewSizes, [12, 16, 20, 24]);
  assert.equal(core100.icons.length, 100);
  assert.equal(audit.summary.icons, 100);
  assert.equal(audit.icons.length, 100);
  const coreNames = new Set(core100.icons.map(icon => icon.name));
  for (const size of rules.reviewSizes) {
    const file = path.join(root, "visual-snapshots", "catalogue-300-" + size + ".svg");
    assert.equal(fs.existsSync(file), true);
    const snapshot = fs.readFileSync(file, "utf8");
    assert.equal((snapshot.match(/data-icon="/g) ?? []).length, 300);
    assert.match(snapshot, new RegExp("Catalogue 300 · " + size + "px"));
    for (const name of coreNames) assert.match(snapshot, new RegExp(`data-icon="${name}"`));
  }
  const canonicalNames = new Set(metadata.icons.map(icon => icon.name));
  for (const icon of audit.icons) {
    assert.equal(coreNames.has(icon.name), true);
    assert.equal(canonicalNames.has(icon.name), true);
  }
});
