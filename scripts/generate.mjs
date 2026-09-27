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

write("packages/react/package.json", JSON.stringify({
  name: "@byjtt/icons-react",
  version: "0.1.0",
  description: "React components for JTT Icons.",
  license: "MIT",
  type: "module",
  sideEffects: false,
  repository: { type: "git", url: "https://github.com/jordan-thirkle/icons-byjtt.git", directory: "packages/react" },
  homepage: "https://icons.byjtt.com",
  bugs: { url: "https://github.com/jordan-thirkle/icons-byjtt/issues" },
  keywords: ["icons", "svg", "react", "ui", "open-source", "ai"],
  peerDependencies: { react: ">=18" },
  exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
  files: ["index.js", "index.d.ts", "README.md"]
}, null, 2) + "\n");
write("packages/react/README.md", `# @byjtt/icons-react\n\nReact components for JTT Icons.\n\n## Install\n\n```bash\nnpm install @byjtt/icons-react react\n```\n\n## Use\n\n```jsx\nimport { IconSearch } from "@byjtt/icons-react";\n\nexport function SearchButton() {\n  return <IconSearch aria-label="Search" />;\n}\n```\n\nComponents accept standard SVG props plus \`size\` and an optional \`title\`. Without a title they render as decorative icons; use an accessible label when the icon conveys meaning.\n\nBrowse the full library at https://icons.byjtt.com\n`);\nwrite("packages/react/index.js", [
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

console.log(`Generated ${metadata.icons.length} icons, ${categories.length} category pages, package modules and public surfaces.`);
