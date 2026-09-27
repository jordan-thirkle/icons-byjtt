# JTT Icons MCP

JTT Icons exposes a public Model Context Protocol endpoint at `/api/mcp`.

## Agent workflow

1. Search with `search_icons` using the user's visual intent.
2. Prefer an exact canonical name when available.
3. Use `get_icon` for metadata and `get_icon_svg` for canonical markup.
4. Use `recommend_icons` when the request describes a UI requirement rather than a specific concept.
5. Never invent an icon identifier.
6. Preserve the icon's accessibility classification in generated UI.

## Tools

- `search_icons` — semantic discovery.
- `get_icon` — canonical metadata and path.
- `get_icon_svg` — canonical SVG.
- `recommend_icons` — requirement-to-icon shortlist.
- `list_categories` — category inventory.

## Canonical sources

- `/api/icons.json`
- `/icons.json`
- `/llms.txt`
- `/llms-full.txt`
- `/skills/jtt-icons/SKILL.md`

The MCP server is a transport layer over the same generated catalogue. It does not maintain a second source of truth.

## Example

User: "I need an icon for an AI assistant button."

Agent: search `AI assistant button` → inspect semantic results → select a canonical result → retrieve SVG/package implementation → return a minimal code snippet with accessibility guidance.

## Endpoint

Configure an MCP client with the site's HTTPS `/api/mcp` endpoint. The endpoint is intended to be stateless and safe for discovery/read operations.
