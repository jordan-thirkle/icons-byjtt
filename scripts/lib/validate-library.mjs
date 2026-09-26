import fs from "node:fs";
import path from "node:path";
import { validateMetadata } from "./validate-metadata.mjs";
import { validateSvg } from "./validate-svg.mjs";

export function validateLibrary(rootDir) {
  const errors = [];
  const read = file => JSON.parse(fs.readFileSync(path.join(rootDir, file), "utf8"));
  const catalogue = read("metadata/icons.json");
  const categories = read("metadata/categories.json");
  const aliases = read("metadata/aliases.json");
  const relationships = read("metadata/relationships.json");
  const derived = fs.existsSync(path.join(rootDir, "metadata/micro-0-1.json")) ? read("metadata/micro-0-1.json") : { icons: [] };
  const derivedPaths = new Set(derived.icons.map(icon => icon.path));
  errors.push(...validateMetadata(catalogue, categories, aliases, relationships).errors);
  const referenced = new Set();
  for (const icon of catalogue.icons) {
    const relative = icon.path.slice(1);
    referenced.add(relative);
    const file = path.join(rootDir, relative);
    if (!fs.existsSync(file)) { errors.push(`${icon.name}: missing SVG ${relative}`); continue; }
    const result = validateSvg(fs.readFileSync(file, "utf8"), icon.path);
    errors.push(...result.errors.map(error => `${icon.name}: ${error}`));
  }
  const walk = dir => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
  );
  for (const file of walk(path.join(rootDir, "icons")).filter(file => file.endsWith(".svg"))) {
    const relative = path.relative(rootDir, file).replaceAll(path.sep, "/");
    if (!referenced.has(relative) && !derivedPaths.has("/" + relative)) errors.push(`unreferenced SVG: ${relative}`);
  }
  for (const icon of derived.icons) {
    if (!icon.source || !catalogue.icons.some(candidate => candidate.path === icon.source)) errors.push(`derived ${icon.name}: missing canonical source ${icon.source}`);
    const relative = icon.path?.slice(1);
    if (!relative || !fs.existsSync(path.join(rootDir, relative))) errors.push(`derived ${icon.name}: missing SVG ${relative}`);
    else errors.push(...validateSvg(fs.readFileSync(path.join(rootDir, relative), "utf8"), icon.path).errors.map(error => `derived ${icon.name}: ${error}`));
  }
  return { ok: errors.length === 0, errors: [...new Set(errors)] };
}
