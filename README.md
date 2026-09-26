# JTT Icons

An open-source icon system for interfaces, developer tools, games, and the web.

Canonical site: https://icons.byjtt.com

JTT Icons is an SVG-first, machine-friendly icon system. The repository is the source of truth for canonical geometry and semantic metadata; generated packages and catalogue surfaces derive from it.

## Principles

- SVG-first and framework-agnostic.
- One semantic identity across visual families.
- Consistent geometry, optical balance, and stable naming.
- Real-size usability, especially 12–16px.
- AI-readable metadata for names, aliases, contexts and relationships.
- Static-first public catalogue.
- MIT licensed.

## Canonical structure

- `/icons` — canonical SVG geometry.
- `/metadata/icons.json` — canonical semantic catalogue.
- `/metadata/categories.json` — allowed categories.
- `/metadata/aliases.json` — canonical alias map.
- `/metadata/relationships.json` — semantic relationships.
- `/packages/core` — generated framework-agnostic package.
- `/scripts` — validation and generation.
- `/docs` — system and contribution rules.

## AI discovery

- `/llms.txt` — concise machine-readable guide.
- `/llms-full.txt` — expanded AI reference.
- `/icons.json` — generated public catalogue.
- `/api/icons.json` — generated stable catalogue endpoint.

Agents should resolve natural-language requests against canonical metadata and use the stable `name` when generating code.

## Development

Run `npm test` for the Node test suite and `npm run check` for deterministic repository validation. Generation is performed with `node scripts/generate.mjs`.

## License

MIT. See LICENSE.
