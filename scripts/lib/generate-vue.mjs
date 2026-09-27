const componentName = name => `Icon${name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}`;

export function generateVuePackage(metadata, svgByName) {
  const files = {};
  const icons = [...metadata.icons].sort((a,b) => a.name.localeCompare(b.name));
  const componentFiles = icons.map(icon => {
    const name = componentName(icon.name);
    const inner = svgByName[icon.name].replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
    return `export const ${name} = defineComponent({ name: ${JSON.stringify(name)}, props: { title: String, size: { type: [Number, String], default: 24 } }, inheritAttrs: true, setup(props, { attrs }) { return () => h("svg", { ...attrs, width: props.size, height: props.size, viewBox: "0 0 24 24", role: props.title ? "img" : "presentation", "aria-hidden": props.title ? undefined : "true", "aria-label": props.title, innerHTML: ${JSON.stringify(inner)} }); } });`;
  });

  files["packages/vue/package.json"] = JSON.stringify({
    name: "@byjtt/icons-vue",
    version: "0.1.0",
    description: "Vue 3 components for JTT Icons.",
    license: "MIT",
    type: "module",
    sideEffects: false,
    publishConfig: { access: "public" },
    repository: { type: "git", url: "https://github.com/jordan-thirkle/icons-byjtt.git", directory: "packages/vue" },
    homepage: "https://icons.byjtt.com",
    bugs: { url: "https://github.com/jordan-thirkle/icons-byjtt/issues" },
    keywords: ["icons", "svg", "vue", "ui", "open-source", "ai"],
    peerDependencies: { vue: ">=3.3" },
    exports: { ".": { types: "./index.d.ts", import: "./index.js" } },
    files: ["index.js", "index.d.ts", "README.md"]
  }, null, 2) + "\n";

  files["packages/vue/index.js"] = [
    'import { defineComponent, h } from "vue";',
    ...componentFiles,
  ].join("\n") + "\n";

  files["packages/vue/index.d.ts"] = [
    'import type { DefineComponent, SVGAttributes } from "vue";',
    'export type JttVueIconProps = SVGAttributes & { title?: string; size?: number | string };',
    ...icons.map(icon => `export declare const ${componentName(icon.name)}: DefineComponent<JttVueIconProps>;`),
  ].join("\n") + "\n";

  files["packages/vue/README.md"] = [
    "# @byjtt/icons-vue",
    "",
    "Vue 3 components for JTT Icons. Version 0.1.0.",
    "",
    "## Install",
    "",
    "```bash",
    "npm install @byjtt/icons-vue vue",
    "```",
    "",
    "## Use",
    "",
    "```vue",
    "<script setup>",
    'import { IconSearch } from "@byjtt/icons-vue";',
    "</script>",
    "",
    "<template>",
    '  <IconSearch aria-label="Search" />',
    "</template>",
    "```",
    "",
    "Components accept standard SVG attributes plus size and an optional title. Without a title they are decorative; use an accessible label when the icon conveys meaning.",
    "",
    "## Links",
    "",
    "- Library: https://icons.byjtt.com",
    "- Documentation: https://icons.byjtt.com/docs/",
    "- Repository: https://github.com/jordan-thirkle/icons-byjtt",
    "- License: MIT"
  ].join("\n") + "\n";

  return files;
}