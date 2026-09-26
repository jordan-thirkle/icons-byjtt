import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const names = metadata.icons.map(icon => icon.name).sort();

const filesIn = directory => fs.readdirSync(directory).filter(name => name.endsWith(".js")).sort();
const dirsIn = directory => fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();

test("generated surfaces materialize every canonical Core 100 icon", () => {
  assert.equal(names.length, 100);

  const packageIcons = filesIn(path.join(root, "packages/core/icons")).map(name => name.replace(/\.js$/, ""));
  assert.deepEqual(packageIcons, names);

  const pageIcons = dirsIn(path.join(root, "icons"));
  assert.deepEqual(pageIcons, names);

  const catalogue = JSON.parse(fs.readFileSync(path.join(root, "icons.json"), "utf8"));
  const apiCatalogue = JSON.parse(fs.readFileSync(path.join(root, "api/icons.json"), "utf8"));
  assert.deepEqual(catalogue.icons.map(icon => icon.name), names);
  assert.deepEqual(apiCatalogue.icons.map(icon => icon.name), names);

  const rootPackage = fs.readFileSync(path.join(root, "packages/core/index.js"), "utf8");
  const declaration = fs.readFileSync(path.join(root, "packages/core/index.d.ts"), "utf8");
  for (const icon of metadata.icons) {
    const identifier = icon.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const safeIdentifier = new Set(["delete"]).has(identifier) ? `icon${identifier[0].toUpperCase()}${identifier.slice(1)}` : identifier;
    assert.match(rootPackage, new RegExp(`from "./icons/${icon.name}\\\\.js";`));
    assert.match(rootPackage, new RegExp(`\\\\b${safeIdentifier}\\\\b`));
    assert.match(declaration, new RegExp(`const ${safeIdentifier}: JttIconModule`));
  }

  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  for (const icon of metadata.icons) assert.match(sitemap, new RegExp(`/icons/${icon.name}/`));

  const aiReference = fs.readFileSync(path.join(root, "llms-full.txt"), "utf8");
  for (const icon of metadata.icons) assert.match(aiReference, new RegExp(`\\\`\\${icon.name}\\\``));
});
