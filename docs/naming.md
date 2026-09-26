# JTT Icons Naming

Names are public API identifiers.

## Rules

- Lowercase kebab-case.
- Describe the semantic concept or action.
- Do not encode visual style in the canonical name.
- Do not use arbitrary numbering.
- Prefer predictable families.

Examples:

- `arrow-up-right`
- `chevron-down`
- `plus`
- `minus`
- `check`
- `x`

## Stability

Once published, a canonical name should not be renamed casually. Breaking renames require release notes and migration guidance.

## Aliases

Aliases are search vocabulary, not replacement canonical names. Add an alias when a real user or agent may reasonably use that term to find the icon. Avoid aliases that introduce semantic ambiguity.
