import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const names = metadata.icons.map(icon => icon.name);
const sameNames = actual => assert.deepEqual([...actual].sort(), [...names].sort());

const filesIn = directory => fs.readdirSync(directory).filter(name => name.endsWith(".js")).sort((a, b) => a.localeCompare(b));
const dirsIn = directory => fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory() && fs.existsSync(path.join(directory, entry.name, "index.html"))).map(entry => entry.name).sort((a, b) => a.localeCompare(b));

test("generated surfaces materialize every canonical Core 100 icon", () => {
  assert.equal(names.length, 100);

  const packageIcons = filesIn(path.join(root, "packages/core/icons")).map(name => name.replace(/\.js$/, ""));
  sameNames(packageIcons);

  const pageIcons = dirsIn(path.join(root, "icons"));
  sameNames(pageIcons);

  const catalogue = JSON.parse(fs.readFileSync(path.join(root, "icons.json"), "utf8"));
  const apiCatalogue = JSON.parse(fs.readFileSync(path.join(root, "api/icons.json"), "utf8"));
  sameNames(catalogue.icons.map(icon => icon.name));
  sameNames(apiCatalogue.icons.map(icon => icon.name));

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
