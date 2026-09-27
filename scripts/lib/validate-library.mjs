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
  const ontology = read("metadata/ontology.json");
  errors.push(...validateMetadata(catalogue, categories, aliases, relationships).errors);
  if (!ontology.version || !/^2\\.\\d+\\.\\d+$/.test(ontology.version)) errors.push("ontology: invalid semantic ontology version");
  if (!ontology.intentGroups || Object.keys(ontology.intentGroups).length < 10) errors.push("ontology: insufficient intent groups");
  for (const [intent, terms] of Object.entries(ontology.intentGroups || {})) if (!Array.isArray(terms) || !terms.length) errors.push("ontology: empty intent group " + intent);
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
    if (!referenced.has(relative)) errors.push(`unreferenced SVG: ${relative}`);
  }
  return { ok: errors.length === 0, errors };
}
