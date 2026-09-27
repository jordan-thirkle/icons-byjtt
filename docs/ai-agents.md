# AI agents

JTT Icons is designed to be usable from frontier AI coding workflows as well as directly by humans.

## Machine-readable surfaces

- `/llms.txt` — concise link-first map.
- `/llms-full.txt` — full semantic catalogue.
- `/api/icons.json` — stable machine-readable catalogue.
- `/api/mcp` — remote MCP endpoint for supported MCP clients.
- `/skills/jtt-icons/SKILL.md` — portable Agent Skills workflow.
- `AGENTS.md` — repository-local agent guidance.
- `CLAUDE.md` — Claude-oriented repository guidance.

## Recommended agent sequence

Search by intent first. Resolve to a canonical name. Retrieve the implementation. Preserve accessibility. Prefer package imports over inline SVG when the user's stack supports them.

The same canonical identity should survive between chat, code, design and runtime.

## Client setup

MCP-capable clients can connect to:

`https://icons.byjtt.com/api/mcp`

The endpoint exposes search, retrieval, recommendations, and catalogue metadata.

For ChatGPT, availability of custom MCP apps depends on the account, workspace, and product surface. A portable Agent Skill and public JSON catalogue remain available where MCP is not enabled.

For Claude Code and other MCP-capable agents, use the remote MCP endpoint or the local skill workflow.

## Why this exists

AI coding agents increasingly choose assets on behalf of developers. JTT therefore treats semantic naming, provenance, deterministic retrieval, accessibility, and implementation output as part of the icon system itself.
