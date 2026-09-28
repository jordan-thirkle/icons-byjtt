import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, "metadata/icons.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(ROOT, "metadata/optical-rules.json"), "utf8"));

test("P1 optical review covers every canonical size", () => {
  assert.deepEqual(rules.reviewSizes, [12, 14, 16, 20, 24]);
  assert.equal(meta.icons.length, 300);
  assert.equal(rules.master.viewBox, 24);
  assert.equal(rules.master.strokeWidth, 2);
  assert.equal(rules.optical.principle, "optical alignment takes precedence over mathematical centering");
});

test("P1 optical review is explicitly release-blocking", () => {
  const audit = fs.readFileSync(path.join(ROOT, "docs/ICON_ART_AUDIT_0_2.md"), "utf8");
  assert.match(audit, /12\/14\/16\/20\/24px optical review is complete/);
  assert.match(audit, /near-duplicate concept review is complete/);
});
