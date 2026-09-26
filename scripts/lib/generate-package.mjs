const jsIdentifier = name => name.replace(/-([a-z])/g, (_, character) => character.toUpperCase());

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
