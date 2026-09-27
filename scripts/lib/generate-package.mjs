const RESERVED_IDENTIFIERS = new Set([
  "await", "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "enum", "export", "extends", "false",
  "finally", "for", "function", "if", "implements", "import", "in",
  "instanceof", "interface", "let", "new", "null", "package", "private",
  "protected", "public", "return", "static", "super", "switch", "this",
  "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield"
]);

const jsIdentifier = name => {
  const identifier = name.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
  return RESERVED_IDENTIFIERS.has(identifier)
    ? `icon${identifier[0].toUpperCase()}${identifier.slice(1)}`
    : identifier;
};

export function generatePackage(metadata, svgByName = {}) {
  const icons = [...metadata.icons].sort((a,b) => a.name.localeCompare(b.name));
  const files = {};
  for (const icon of icons) {
    const svg = svgByName[icon.name] ?? "";
    files[`packages/core/icons/${icon.name}.js`] = `export const name = ${JSON.stringify(icon.name)};
export const title = ${JSON.stringify(icon.title)};
export const category = ${JSON.stringify(icon.category)};
export const svg = ${JSON.stringify(svg)};
export const metadata = ${JSON.stringify(icon)};
`;
  }

  files["packages/core/README.md"] = [
    "# @byjtt/icons",
    "",
    "Open-source, semantic SVG icons from JTT Icons. Version ${metadata.version}.",
    "",
    "## Install",
    "",
    "```bash",
    "npm install @byjtt/icons",
    "```",
    "",
    "## Use",
    "",
    "```js",
    'import { Search } from "@byjtt/icons";',
    "",
    "console.log(Search.svg);",
    "```",
    "",
    "Each export contains name, title, category, svg and canonical metadata. The package is ESM-first, side-effect free, and ships the canonical SVG source without a runtime dependency.",
    "",
    "## Single-icon import",
    "",
    "```js",
    'import * as Search from "@byjtt/icons/icons/search";',
    "```",
    "",
    "## React",
    "",
    "Use @byjtt/icons-react for generated React components.",
    "",
    "## Links",
    "",
    "- Library: https://icons.byjtt.com",
    "- Documentation: https://icons.byjtt.com/docs/",
    "- Repository: https://github.com/jordan-thirkle/icons-byjtt",
    "- License: MIT"
  ].join("\n") + "\n";

  files["packages/core/index.js"] =
    icons.map(icon => `import * as ${jsIdentifier(icon.name)} from "./icons/${icon.name}.js";`).join("\n") +
    `\n\nexport { ${icons.map(icon => jsIdentifier(icon.name)).join(", ")} };
export const iconNames = ${JSON.stringify(icons.map(icon => icon.name))};
export const icons = { ${icons.map(icon => jsIdentifier(icon.name)).join(", ")} };
`;

  files["packages/core/index.d.ts"] =
    `export interface JttIconMetadata {
  name: string;
  title: string;
  category: string;
  tags: string[];
  aliases: string[];
  contexts: string[];
  related: string[];
  accessibility: { default: "decorative" | "meaningful" | "interactive" | "status" | "brand" };
  path: string;
  family: "line";
}
export interface JttIconModule {
  name: string;
  title: string;
  category: string;
  svg: string;
  metadata: JttIconMetadata;
}
` +
    icons.map(icon => `export declare const ${jsIdentifier(icon.name)}: JttIconModule;`).join("\n") +
    `\nexport declare const iconNames: readonly string[];
export declare const icons: Record<string, JttIconModule>;
`;

  const componentName = name => `Icon${name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}`;
  const innerSvg = svg => svg.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  files["packages/react/package.json"] = JSON.stringify({name:"@byjtt/icons-react",version:metadata.version,description:"React components for JTT Icons.",license:"MIT",type:"module",sideEffects:false,publishConfig:{access:"public"},repository:{type:"git",url:"https://github.com/jordan-thirkle/icons-byjtt.git",directory:"packages/react"},homepage:"https://icons.byjtt.com",peerDependencies:{react:">=18"},files:["index.js","index.d.ts","README.md"]},null,2)+"\n";
  files["packages/react/index.js"] = 'import React from "react";\n' + icons.map(icon => { const n=componentName(icon.name); return `export function ${n}({ title, size = 24, ...props }) { return React.createElement("svg", { ...props, width:size, height:size, viewBox:"0 0 24 24", role:title?"img":"presentation", "aria-hidden":title?undefined:"true", "aria-label":title, dangerouslySetInnerHTML:{__html:${JSON.stringify(innerSvg(svgByName[icon.name] || ""))}} }); }`; }).join("\n")+"\n";
  files["packages/react/index.d.ts"] = ['import type { ReactElement, SVGProps } from "react";','export type JttReactIconProps = SVGProps<SVGSVGElement> & { title?: string; size?: number | string };',...icons.map(icon => `export declare function ${componentName(icon.name)}(props:JttReactIconProps):ReactElement;`)].join("\n")+"\n";
  files["packages/react/README.md"] = `# @byjtt/icons-react\n\nReact components for JTT Icons. Version ${metadata.version}.\n`;
  files["packages/svelte/package.json"] = JSON.stringify({name:"@byjtt/icons-svelte",version:metadata.version,description:"Svelte components for JTT Icons.",license:"MIT",type:"module",sideEffects:false,publishConfig:{access:"public"},repository:{type:"git",url:"https://github.com/jordan-thirkle/icons-byjtt.git",directory:"packages/svelte"},homepage:"https://icons.byjtt.com",peerDependencies:{svelte:">=4"},files:["index.js","index.d.ts","JttIcon.svelte","README.md"]},null,2)+"\n";
  files["packages/svelte/index.js"] = 'export { default as JttIcon } from "./JttIcon.svelte";\n';
  files["packages/svelte/index.d.ts"] = 'import type { SvelteComponentTyped } from "svelte";\nexport interface JttIconProps { name:string; size?:number|string; title?:string; [key:string]:any }\nexport default class JttIcon extends SvelteComponentTyped<JttIconProps> {}\n';
  files["packages/svelte/JttIcon.svelte"] = '<script>export let name=""; export let size=24; export let title="";</script>\n<svg width={size} height={size} viewBox="0 0 24 24" role={title?"img":"presentation"} aria-hidden={title?undefined:"true"} aria-label={title}>{#if title}<title>{title}</title>{/if}</svg>\n';
  files["packages/svelte/README.md"] = `# @byjtt/icons-svelte\n\nSvelte components for JTT Icons. Version ${metadata.version}.\n`;
  files["packages/web/package.json"] = JSON.stringify({name:"@byjtt/icons-web",version:metadata.version,description:"Web Components for JTT Icons.",license:"MIT",type:"module",sideEffects:true,publishConfig:{access:"public"},repository:{type:"git",url:"https://github.com/jordan-thirkle/icons-byjtt.git",directory:"packages/web"},homepage:"https://icons.byjtt.com",files:["index.js","index.d.ts","README.md"]},null,2)+"\n";
  files["packages/web/index.js"] = 'class JttIcon extends HTMLElement { static observedAttributes=["name","size","title","color","stroke-width"]; connectedCallback(){this.render()} attributeChangedCallback(){this.render()} render(){this.textContent="JTT icon: "+(this.getAttribute("name")||"");} } customElements.define("jtt-icon",JttIcon); export { JttIcon };\n';
  files["packages/web/index.d.ts"] = 'export class JttIcon extends HTMLElement {}\ndeclare global { interface HTMLElementTagNameMap { "jtt-icon": JttIcon; } }\n';
  files["packages/web/README.md"] = `# @byjtt/icons-web\n\nWeb Components for JTT Icons. Version ${metadata.version}.\n`;
  return files;
}
