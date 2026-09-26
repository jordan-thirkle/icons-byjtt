export function generateCatalogue(metadata) {
  const icons = [...metadata.icons].sort((a,b) => a.name.localeCompare(b.name));
  return {
    name: metadata.name,
    version: metadata.version,
    license: metadata.license,
    prefix: metadata.prefix,
    baseUrl: metadata.baseUrl,
    family: metadata.family,
    icons
  };
}
