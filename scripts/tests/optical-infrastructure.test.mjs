import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-rules.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-audit.json"), "utf8"));

test("optical infrastructure covers the full catalogue", () => {
  assert.deepEqual(rules.reviewSizes, [12, 14, 16, 20, 24]);
  assert.equal(metadata.icons.length, 300);
  assert.equal(audit.summary.icons, 300);
  assert.equal(audit.icons.length, 300);

  const canonicalNames = new Set(metadata.icons.map(icon => icon.name));
  for (const icon of audit.icons) assert.equal(canonicalNames.has(icon.name), true);
  assert.equal(new Set(audit.icons.map(icon => icon.name)).size, 300);
  assert.ok(audit.summary.maxComplexityScore >= 0);
  assert.ok(audit.summary.microReviewCount >= 0);
});
