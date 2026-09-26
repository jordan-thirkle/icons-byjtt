# JTT Icons Contributing

A new icon must follow the system rather than invent a new local convention.

## Workflow

1. Define the concept and intended use.
2. Choose a stable canonical name.
3. Add semantic metadata: title, tags, aliases, contexts and relationships.
4. Draw the canonical Line SVG on the 24 × 24 grid.
5. Review optical balance.
6. Check 12–16px rendering.
7. Assign the accessibility classification.
8. Run `npm test`.
9. Run `npm run check`.
10. Regenerate with `node scripts/generate.mjs`.
11. Confirm generated outputs are deterministic.
12. Review the public catalogue page.

## Source of truth

Author only canonical geometry and semantic metadata. Do not hand-edit generated `icons.json`, `api/icons.json`, package icon modules, sitemap entries or generated detail pages.

## Quality gate

Meaning → naming → metadata → geometry → optical review → small-size review → accessibility → validation → generation → catalogue integration.

## Pull requests

Keep icon additions focused. Explain unusual geometry decisions. A new icon should solve a real semantic gap rather than duplicate an existing concept.
