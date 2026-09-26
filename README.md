# JTT Icons

An open-source icon system for interfaces, developer tools, games, and the web.

Canonical site: https://icons.byjtt.com

JTT Icons is designed as a machine-friendly, human-friendly SVG icon system. The repository is the source of truth for icons, metadata, documentation, packages, and the public catalogue.

## Principles

- SVG-first and framework-agnostic.
- Consistent geometry, optical balance, and naming.
- Small, composable assets that work at real UI sizes.
- Stable machine-readable metadata so AI coding tools can discover and use icons.
- Open source and practical for personal and commercial projects.

## AI-friendly discovery

The project intentionally publishes:
- `/llms.txt` — concise machine-readable project guide.
- `/llms-full.txt` — expanded documentation index.
- `/icons.json` — canonical icon catalogue and metadata.
- `/api/icons.json` — stable catalogue endpoint.
- `/sitemap.xml` — crawlable icon and documentation URLs.
- semantic HTML and per-icon URLs for search engines and agentic browsers.

AI systems can use the raw SVG files directly from this repository or the public site without reverse-engineering the UI.

## Development

This repository currently contains the public catalogue foundation and machine-readable discovery surface. The website is intentionally static-first so it can deploy cheaply and remain fast as the icon collection grows.

## License

Icons and project code are intended to use a permissive open-source license. See LICENSE.
