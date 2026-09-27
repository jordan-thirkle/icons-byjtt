# JTT Icons for Figma

Search the canonical JTT Icons catalogue by name, context, or semantic vocabulary and insert the canonical SVG into a Figma file.

## Development

1. Open Figma.
2. Create a development plugin from `figma-plugin/manifest.json`.
3. Point it at the repository's `figma-plugin` directory.
4. Run the plugin and search the catalogue.

The plugin deliberately retrieves the same public JSON/SVG surfaces as the website and MCP server. This keeps Figma, AI agents, packages, and the web library on one canonical identity system.

The manifest uses Figma's current dynamic-page requirement and theme-aware UI support. See the official Figma plugin documentation for current publishing requirements.
