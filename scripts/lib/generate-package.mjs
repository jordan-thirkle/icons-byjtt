const RESERVED_IDENTIFIERS = new Set(["await","break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","implements","import","in","instanceof","interface","let","new","null","package","private","protected","public","return","static","super","switch","this","throw","true","try","typeof","var","void","while","with","yield"]);
const jsIdentifier = name => { const identifier = name.replace(/-([a-z])/g, (_, character) => character.toUpperCase()); return RESERVED_IDENTIFIERS.has(identifier) ? `icon${identifier[0].toUpperCase()}${identifier.slice(1)}` : identifier; };

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

  return files;
}
