import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { assertSemanticContract, assertSemanticMetadataStable } from "../lib/semantic-regression.mjs";

const root = process.cwd();
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const semantic = JSON.parse(fs.readFileSync(path.join(root, "metadata/micro-semantic.json"), "utf8"));
const canonicalByName = new Map(catalogue.icons.map(icon => [icon.name, icon]));

for (const manifestName of ["micro-0-1.json", "micro-0-2.json"]) {
  test(manifestName + " preserves declared semantic identity", () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, "metadata", manifestName), "utf8"));
    for (const entry of manifest.icons) {
      const contract = semantic.contracts[entry.name];
      assert.ok(contract, entry.name + " is missing a semantic recognition contract");
      const source = canonicalByName.get(entry.name);
      assert.ok(source, entry.name + " is missing a canonical metadata record");

      const sourceSvg = fs.readFileSync(path.join(root, entry.source.slice(1)), "utf8");
      const microSvg = fs.readFileSync(path.join(root, entry.path.slice(1)), "utf8");
      assertSemanticContract(sourceSvg, microSvg, contract, entry.name);
      assertSemanticMetadataStable(source, source, entry.name);
    }
  });
}

test("every Micro 0.1 and 0.2 entry has a semantic contract", () => {
  for (const manifestName of ["micro-0-1.json", "micro-0-2.json"]) {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, "metadata", manifestName), "utf8"));
    for (const entry of manifest.icons) assert.equal(Boolean(semantic.contracts[entry.name]), true, entry.name);
  }
});
