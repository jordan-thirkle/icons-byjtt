import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-rules.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-audit.json"), "utf8"));

test("optical infrastructure covers Core 100 at every review size", () => {
  assert.deepEqual(rules.reviewSizes, [12, 16, 20, 24]);
  assert.equal(audit.summary.icons, 100);
  assert.equal(audit.icons.length, 100);
  for (const size of rules.reviewSizes) {
    const file = path.join(root, "visual-snapshots", "core-100-" + size + ".svg");
    assert.equal(fs.existsSync(file), true);
    const snapshot = fs.readFileSync(file, "utf8");
    assert.equal((snapshot.match(/data-icon="/g) ?? []).length, 100);
    assert.match(snapshot, new RegExp("Core 100 · " + size + "px"));
  }
  const canonicalNames = new Set(metadata.icons.map(icon => icon.name));
  for (const icon of audit.icons) assert.equal(canonicalNames.has(icon.name), true);
});
