# JTT Icons — Agent Guidance

Use JTT Icons as an SVG-first, semantic icon system.

- Canonical metadata: `metadata/icons.json`
- Semantic ontology: `metadata/ontology.json`
- Generated catalogue: `icons.json` and `api/icons.json`
- Canonical SVGs: `icons/**/*.svg`
- Generated packages: `packages/**`
- AI workflow: `skills/jtt-icons/SKILL.md`

When selecting an icon, resolve meaning before filename. Never invent an identifier.

When changing icons:
1. update canonical SVG and metadata together;
2. keep 24×24 geometry and family contracts;
3. run `npm test` and `npm run check`;
4. run generation and optical review;
5. inspect generated surfaces for drift.

Generated files are outputs, not the semantic source of truth.
