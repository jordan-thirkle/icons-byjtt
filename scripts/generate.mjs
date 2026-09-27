import fs from "node:fs";
import path from "node:path";
import { generateCatalogue } from "./lib/generate-catalogue.mjs";
import { generatePackage } from "./lib/generate-package.mjs";
import { homepage, iconPage, categoryPage, sitemap, favicon } from "./lib/generate-site.mjs";
import { generateAiReference } from "./lib/generate-ai-reference.mjs";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const catalogue = generateCatalogue(metadata);
const svgByName = Object.fromEntries(
  metadata.icons.map(icon => [icon.name, fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8")])
);
const files = generatePackage(metadata, svgByName);
const write = (file, content) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

write("index.html", homepage(catalogue));
write("favicon.svg", favicon());
write("icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("api/icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("sitemap.xml", sitemap(catalogue));
write("llms-full.txt", generateAiReference(metadata));

for (const [file, content] of Object.entries(files)) write(file, content);

const byName = new Map(catalogue.icons.map(icon => [icon.name, icon]));
for (const icon of catalogue.icons) {
  const relatedIcons = icon.related.map(name => byName.get(name)).filter(Boolean);
  write(`icons/${icon.name}/index.html`, iconPage(icon, svgByName[icon.name], relatedIcons));
}

const categories = [...new Set(catalogue.icons.map(icon => icon.category))].sort();
for (const category of categories) {
  const icons = catalogue.icons.filter(icon => icon.category === category);
  write(`categories/${category}/index.html`, categoryPage(category, icons));
}

console.log(`Generated ${metadata.icons.length} icons, ${categories.length} category pages, package modules and public surfaces.`);
