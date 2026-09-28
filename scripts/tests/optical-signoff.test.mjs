import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const signoff = JSON.parse(fs.readFileSync(path.join(root, "metadata/optical-signoff.json"), "utf8"));

test("JTT Art Direction v2 is locked for the full 300-icon optical gate", () => {
  assert.equal(signoff.status, "locked");
  assert.equal(signoff.catalogueSize, 300);
  assert.deepEqual(signoff.reviewSizes, [12, 14, 16, 20, 24]);
  assert.equal(signoff.renderedInstances, 1500);
  assert.equal(signoff.categorySheets, 11);
  assert.equal(signoff.redesignedIcons.length, 26);
  assert.equal(signoff.releaseDecision.includes("expansion gate"), true);
  assert.ok(signoff.criteria.length >= 8);
});
