import fs from "node:fs";
import path from "node:path";
import { generateCatalogue } from "./lib/generate-catalogue.mjs";
import { generatePackage } from "./lib/generate-package.mjs";
import { homepage, iconPage, categoryPage, useCasePage, docsPage, sitemap, favicon, USE_CASES } from "./lib/generate-site.mjs";
import { generateAiReference } from "./lib/generate-ai-reference.mjs";
import { generateVuePackage } from "./lib/generate-vue.mjs";

const root = process.cwd();
const metadata = JSON.parse(fs.readFileSync(path.join(root, "metadata/icons.json"), "utf8"));
const catalogue = generateCatalogue(metadata);
const svgByName = Object.fromEntries(
  metadata.icons.map(icon => [icon.name, fs.readFileSync(path.join(root, icon.path.slice(1)), "utf8")])
);
const files = generatePackage(metadata, svgByName);
const reactComponentName = name => `Icon${name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}`;
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
for (const [file, content] of Object.entries(generateVuePackage(metadata, svgByName))) write(file, content);

write("packages/react/package.json", JSON.stringify({
  name: "@byjtt/icons-react",
  version: "0.1.0",
  description: "React components for JTT Icons.",
  license: "MIT",
  type: "module",
  sideEffects: false,
  publishConfig: { access: "public" },
  repository: { type: "git", url: "https://github.com/jordan-thirkle/icons-byjtt.git", directory: "packages/react" },
  homepage: "https://icons.byjtt.com",
  bugs: { url: "https://github.com/jordan-thirkle/icons-byjtt/issues" },
  keywords: ["icons", "svg", "react", "ui", "open-source", "ai"],
  peerDependencies: { react: ">=18" },
  exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
  files: ["index.js", "index.d.ts", "README.md"]
}, null, 2) + "\n");
write("packages/react/README.md", [
  "# @byjtt/icons-react",
  "",
  "React components for JTT Icons. Version 0.1.0.",
  "",
  "## Install",
  "",
  "```bash",
  "npm install @byjtt/icons-react react",
  "```",
  "",
  "## Use",
  "",
  "```jsx",
  'import { IconSearch } from "@byjtt/icons-react";',
  "",
  "export function SearchButton() {",
  '  return <IconSearch aria-label="Search" />;',
  "}",
  "```",
  "",
  "Components accept standard SVG props plus size and an optional title. Without a title they render as decorative icons; use an accessible label when the icon conveys meaning.",
  "",
  "## Links",
  "",
  "- Library: https://icons.byjtt.com",
  "- Documentation: https://icons.byjtt.com/docs/",
  "- Repository: https://github.com/jordan-thirkle/icons-byjtt",
  "- License: MIT"
].join("\n") + "\n");
write("packages/react/index.js", [
  'import React from "react";',
  ...catalogue.icons.map(icon => `export function ${reactComponentName(icon.name)}({ title, size = 24, ...props }) { return React.createElement("svg", { ...props, width: size, height: size, viewBox: "0 0 24 24", role: title ? "img" : "presentation", "aria-hidden": title ? undefined : "true", "aria-label": title, dangerouslySetInnerHTML: { __html: ${JSON.stringify(svgByName[icon.name].replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, ""))} } }); }`),
].join("\n") + "\n");
write("packages/react/index.d.ts", [
  'import type { ReactElement, SVGProps } from "react";',
  'export type JttReactIconProps = SVGProps<SVGSVGElement> & { title?: string; size?: number | string };',
  ...catalogue.icons.map(icon => `export declare function ${reactComponentName(icon.name)}(props: JttReactIconProps): ReactElement;`),
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

for (const [slug, config] of Object.entries(USE_CASES)) {
  const icons = config.names.map(name => byName.get(name)).filter(Boolean);
  write(`use-cases/${slug}/index.html`, useCasePage(slug, config, icons));
}/index.html`, useCasePage(slug, config, icons));
}

console.log(`Generated ${metadata.icons.length} icons, ${categories.length} category pages, package modules and public surfaces.`);
