# JTT Icons — Claude Guidance

Read `AGENTS.md` first. It is the repository-wide contract.

For any task:
- inspect before editing;
- preserve canonical semantics;
- change source-of-truth files before generated outputs;
- run `npm test` and `npm run check`;
- keep the public deployment isolated from repository source.

For icon work:
- search canonical metadata and ontology first;
- never invent an identifier;
- use `docs/design-principles.md`, `docs/naming.md` and `docs/accessibility.md`;
- review small-size behaviour before completion.

For AI/MCP work:
- keep website, JSON, MCP, Agent Skill, packages and Figma on one canonical identity;
- unknown identifiers must fail clearly;
- do not turn AI documentation into a second source of truth.

Do not commit secrets, credentials, private data, local paths or internal-only material.
