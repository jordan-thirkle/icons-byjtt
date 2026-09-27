import fs from "node:fs";
import path from "node:path";
import { generateCatalogue } from "./lib/generate-catalogue.mjs";
import { generatePackage } from "./lib/generate-package.mjs";
import { homepage, iconPage, categoryPage, useCasePage, docsPage, sitemap, favicon } from "./lib/generate-site.mjs";
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

const useCases = {
  "navigation-icons": { title: "Navigation Icons", description: "Open-source navigation icons for menus, breadcrumbs, tabs, search, links and moving through digital products.", lead: "Use familiar directional and wayfinding concepts without inventing your own icon vocabulary.", names: ["arrow-left","arrow-right","arrow-up","arrow-down","chevron-left","chevron-right","chevron-up","chevron-down","menu","home","search","location","map"], notes: ["Use directional icons when the action itself is spatial or sequential.","Pair icon-only navigation controls with an accessible name.","Keep the same directional meaning consistent across the product."] },
  "interface-actions": { title: "Interface Action Icons", description: "Open-source action icons for creating, editing, confirming, deleting, downloading, uploading and managing interface state.", lead: "Common actions should be instantly recognisable and consistent across your product.", names: ["plus","edit","check","delete","copy","download","upload","save","refresh","undo","redo","share","filter","sort"], notes: ["Prefer a familiar action glyph over a decorative metaphor.","Use destructive icons with explicit surrounding labels or confirmation UI.","Keep icon-only controls large enough to operate comfortably."] },
  "developer-tools": { title: "Developer Tool Icons", description: "Open-source icons for developer tools, repositories, terminals, code, infrastructure, bugs and deployment interfaces.", lead: "Build developer-facing interfaces from a vocabulary that maps cleanly to engineering concepts.", names: ["code","braces","terminal","git-branch","git-commit","git-merge","github","server","database","bug","rocket","settings"], notes: ["Use repository and version-control icons for concrete engineering concepts.","Use status and utility icons alongside text when the meaning could be ambiguous.","Prefer semantic names so design tokens and AI tooling can discover the same concept."] },
  "communication-ui": { title: "Communication Icons", description: "Open-source icons for messaging, notifications, mail, sharing, reactions and communication workflows.", lead: "Make communication states legible without turning every notification into visual noise.", names: ["message","mail","bell","send","share","heart","bookmark","info","help"], notes: ["Use notification icons for state, not as a substitute for the notification message.","Use familiar communication metaphors consistently.","Provide accessible names for meaningful icon-only controls."] }
};
for (const [slug, config] of Object.entries(useCases)) {
  const icons = config.names.map(name => byName.get(name)).filter(Boolean);
  write(`use-cases/${slug}/index.html`, useCasePage(slug, config, icons));
}

console.log(`Generated ${metadata.icons.length} icons, ${categories.length} category pages, package modules and public surfaces.`);
