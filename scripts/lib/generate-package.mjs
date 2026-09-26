export function generatePackage(metadata, svgByName = {}) {
  return Object.fromEntries([...metadata.icons].sort((a,b) => a.name.localeCompare(b.name)).map(icon => {
    const svg = svgByName[icon.name] ?? "";
    const source = `export const name = ${JSON.stringify(icon.name)};
export const title = ${JSON.stringify(icon.title)};
export const category = ${JSON.stringify(icon.category)};
export const svg = ${JSON.stringify(svg)};
export const metadata = ${JSON.stringify(icon)};
`;
    return [`packages/core/icons/${icon.name}.js`, source];
  }));
}
