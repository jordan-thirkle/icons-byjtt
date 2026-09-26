import fs from "node:fs";
import path from "node:path";
import { generateCatalogue } from "./lib/generate-catalogue.mjs";
import { generatePackage } from "./lib/generate-package.mjs";
import { iconPage, sitemap } from "./lib/generate-site.mjs";
import { generateAiReference } from "./lib/generate-ai-reference.mjs";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const catalogue = generateCatalogue(metadata);
const svgByName = Object.fromEntries(metadata.icons.map(icon => [icon.name, fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8")]));
const files = generatePackage(metadata, svgByName);
const write = (file, content) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, content); };

write("icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("api/icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("sitemap.xml", sitemap(catalogue));
write("llms-full.txt", generateAiReference(metadata));
for (const [file, content] of Object.entries(files)) write(file, content);
for (const icon of catalogue.icons) write(`icons/${icon.name}/index.html`, iconPage(icon, svgByName[icon.name]));
console.log(`Generated ${metadata.icons.length} icons, catalogue pages, package modules and sitemap.`);
