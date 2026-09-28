# JTT Icons 0.2 — 300-Icon Art Audit

Status: RELEASE BLOCKING

## Findings

A corpus-wide SVG audit was run against all 300 canonical icons on PR #21.

Results:
- 300/300 SVGs discovered.
- 300/300 use the 24x24 viewBox.
- 300/300 satisfy the currentColor/family contract.
- generation and optical-grid generation pass.
- 15 exact duplicate geometry groups.
- 198 icon identities are members of those duplicate groups.
- 66 icons are single-shape circle/rectangle candidates.

The duplicate groups include unrelated concepts sharing identical geometry, including AI concepts, cloud variants, people variants, status variants, brand icons, navigation variants, file/object variants and many actions. This is a release-blocking art defect.

## Visual direction v2

JTT should be geometric, compact, calm, highly legible, optically disciplined and semantically explicit.

Base:
- 24x24 coordinate system.
- 2px canonical stroke at 24px.
- round caps and joins.
- currentColor inheritance.
- deliberate negative space and controlled radii.
- orthogonal and 45-degree construction where appropriate.
- no gradients, filters or decorative noise.
- filled silhouettes only for deliberate semantic or brand exceptions.

Every icon must survive inspection at 12, 14, 16, 20 and 24px. Small sizes may simplify detail; large sizes must preserve useful negative space.

Distinctiveness should come from a coherent JTT construction grammar rather than novelty: compact optical bodies, strong negative space, geometric anchors, parent/variant derivation, clear state modifiers and restrained optical asymmetry.

## AI family rule

The current AI family is unacceptable because multiple concepts share the same sparkle.

Required separation:
- ai-agent: autonomous actor/orchestrator.
- ai-model: model/intelligence substrate.
- ai-prompt: instruction/input.
- ai-generate: transformation/creation.
- ai-chat: conversation.
- ai-search: semantic discovery.
- ai-code: code generation/assistance.

Each must have an independently recognisable silhouette.

## Variant rule

Related icons must visibly derive from their parent where appropriate:
folder variants; file variants; user variants; cloud variants; media controls; status/state variants.

## Semantic rule

Aliases such as download/export, upload/import, heart/like and lock/private are useful retrieval vocabulary but are not necessarily literal synonyms. Future metadata should distinguish canonical identity, synonym, contextual search term, related, opposite, paired and state relationships.

## Release gate

Do not expand beyond 300 until:
1. exact duplicate geometry = 0;
2. placeholder-level geometry = 0;
3. every icon is semantically recognisable;
4. variant families are coherent;
5. AI and brand families are individually recognisable;
6. 12/14/16/20/24px optical review is complete;
7. near-duplicate concept review is complete;
8. ontology aliases are classified;
9. visual regression contains family fixtures and known failures.

Repair order: placeholders/duplicates -> AI -> brands -> variants -> remaining families -> optical pass -> ontology cleanup -> distinctiveness review -> final human art direction.
