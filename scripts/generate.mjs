import fs from "node:fs";
import path from "node:path";
import { generateCatalogue } from "./lib/generate-catalogue.mjs";
import { generatePackage } from "./lib/generate-package.mjs";
import { homepage, iconPage, categoryPage, docsPage, sitemap, favicon } from "./lib/generate-site.mjs";
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
write("docs/index.html", docsPage());
write("favicon.svg", favicon());
write("icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("api/icons.json", JSON.stringify(catalogue, null, 2) + "\n");
write("sitemap.xml", sitemap(catalogue));
write("llms-full.txt", generateAiReference(metadata));

for (const [file, content] of Object.entries(files)) write(file, content);

write("packages/react/package.json", JSON.stringify({
  name: "@byjtt/icons-react",
  version: "0.1.0",
  description: "React components for JTT Icons.",
  license: "MIT",
  type: "module",
  sideEffects: false,
  peerDependencies: { react: ">=18" },
  exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
  files: ["index.js", "index.d.ts", "icons"]
}, null, 2) + "\n");
write("packages/react/index.js", [
  'import React from "react";',
  ...catalogue.icons.map(icon => `export function ${icon.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(delete)$/, "IconDelete")}({ title, size = 24, ...props }) { return React.createElement("svg", { ...props, width: size, height: size, viewBox: "0 0 24 24", role: title ? "img" : "presentation", "aria-hidden": title ? undefined : "true", "aria-label": title, dangerouslySetInnerHTML: { __html: ${JSON.stringify(svgByName[icon.name].replace(/<svg[^>]*>/, "").replace(/<\\/svg>\\s*$/, ""))} } }); }`),
].join("\n") + "\n");
write("packages/react/index.d.ts", [
  'import type { SVGProps } from "react";',
  'export type JttReactIconProps = SVGProps<SVGSVGElement> & { title?: string; size?: number | string };',
  ...catalogue.icons.map(icon => `export declare function ${icon.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(delete)$/, "IconDelete")}(props: JttReactIconProps): JSX.Element;`),
].join("\n") + "\n");

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
