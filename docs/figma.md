# Figma

JTT Icons uses the same canonical metadata and ontology across web, packages, AI and Figma.

## Development plugin

The repository contains a development plugin in `figma-plugin/`:

- `manifest.json` — current plugin manifest
- `code.js` — fetches canonical icon metadata/SVGs and inserts them
- `ui.html` — semantic search UI
- `README.md` — setup instructions

The plugin intentionally uses the public catalogue rather than maintaining a second icon database.

## Figma library

A starter Figma file is available for the canonical library:

https://www.figma.com/design/X122dzT16Fg9HgAu3C3aRX

The file establishes the canonical library cover and source-of-truth references. The repository plugin is the distribution mechanism; publishing to the Figma Community still requires the account's normal publishing flow and review.