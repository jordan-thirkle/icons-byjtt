# Principles for AI Contributions

AI agents are first-class contributors, but all agents operate under the same repository contracts as human contributors.

## Canonical source first

Do not patch generated artefacts when a canonical source or generator owns them.

## Meaning before naming

Icon identifiers are public API. Resolve semantic intent before selecting or creating names.

## Evidence before expansion

Prefer demonstrated semantic gaps from real search failures, issues, usage or design review over arbitrary catalogue growth.

## Tests are constraints

Never disable validation to make a change pass. Update implementation and tests together when a contract intentionally changes.

## Public means public

Everything committed to this repository should be assumed discoverable. Never commit secrets, credentials, private data, local paths or internal-only planning material.

## Small coherent changes

Avoid unrelated refactors, dependency churn and speculative abstractions.

## Explainable PRs

Every change should make clear what changed, why, which canonical sources changed and how it was verified.
