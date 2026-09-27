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

  assert.ok(fs.existsSync(path.join(root, "packages/react/package.json")));
  assert.ok(fs.existsSync(path.join(root, "packages/react/index.js")));
  assert.ok(fs.existsSync(path.join(root, "packages/react/index.d.ts")));
  assert.ok(fs.existsSync(path.join(root, "packages/react/README.md")));
  assert.ok(fs.existsSync(path.join(root, "packages/vue/package.json")));
  assert.ok(fs.existsSync(path.join(root, "packages/vue/index.js")));
  assert.ok(fs.existsSync(path.join(root, "packages/vue/index.d.ts")));
  assert.ok(fs.existsSync(path.join(root, "packages/vue/README.md")));
  const reactSource = fs.readFileSync(path.join(root, "packages/react/index.js"), "utf8");
  for (const icon of metadata.icons) assert.match(reactSource, new RegExp(`function Icon${icon.name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}\\b`));
  const vueSource = fs.readFileSync(path.join(root, "packages/vue/index.js"), "utf8");
  for (const icon of metadata.icons) assert.match(vueSource, new RegExp(`Icon${icon.name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}\\b`));

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
    assert.ok(rootPackage.includes(`from "./icons/${icon.name}.js";`));
    assert.match(rootPackage, new RegExp(`\\b${safeIdentifier}\\b`));
    assert.ok(declaration.includes(`const ${safeIdentifier}: JttIconModule`));
  }

  for (const slug of ["navigation-icons","interface-actions","developer-tools","communication-ui"]) assert.ok(fs.existsSync(path.join(root, "use-cases", slug, "index.html")));

  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  for (const slug of ["navigation-icons","interface-actions","developer-tools","communication-ui"]) assert.ok(sitemap.includes(`/use-cases/${slug}/`));
  for (const icon of metadata.icons) assert.ok(sitemap.includes(`/icons/${icon.name}/`));

  const aiReference = fs.readFileSync(path.join(root, "llms-full.txt"), "utf8");
  for (const icon of metadata.icons) assert.ok(aiReference.includes(`\`${icon.name}\``));
});
