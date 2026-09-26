import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "metadata/micro-0-2.json"), "utf8"));
const audit = JSON.parse(fs.readFileSync(path.join(root, "metadata/micro-0-2-audit.json"), "utf8"));

test("Micro 0.2 contains only the representative proof set", () => {
  assert.equal(manifest.icons.length, 6);
  assert.deepEqual(
    manifest.icons.map(icon => icon.name),
    ["archive", "cart", "database", "edit", "git-branch", "loading"]
  );
  assert.equal(manifest.gatedCandidates.length, 4);
  assert.deepEqual(
    manifest.gatedCandidates.map(icon => icon.name),
    ["copy", "map", "volume-off", "warning"]
  );
});

test("Micro 0.2 audit is deterministic and complete", () => {
  assert.equal(audit.icons.length, 6);
  assert.deepEqual(audit.reviewSizes, [12, 16]);
  assert.equal(audit.summary.icons, 6);
  assert.equal(audit.summary.averageComplexityReduction, 0.231);
  for (const entry of audit.icons) {
    assert.equal(entry.source.startsWith("/icons/"), true, entry.name);
    assert.equal(entry.path.startsWith("/icons/micro/"), true, entry.name);
    assert.ok(entry.microComplexityScore <= entry.sourceComplexityScore || ["archive", "cart", "git-branch"].includes(entry.name), entry.name);
  }
});

for (const size of [12, 16]) {
  test("Micro 0.2 " + size + "px snapshot covers all six icons", () => {
    const file = path.join(root, "visual-snapshots", "micro-0-2-" + size + ".svg");
    assert.equal(fs.existsSync(file), true);
    const svg = fs.readFileSync(file, "utf8");
    assert.equal((svg.match(/data-icon="/g) ?? []).length, 6);
    assert.match(svg, new RegExp("Micro 0.2 .* " + size + "px"));
  });
}
