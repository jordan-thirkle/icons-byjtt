# JTT Icons Micro 0.1

Micro 0.1 is the first experimental proof of the JTT derived-family model.

It is intentionally **not part of the canonical catalogue or package yet**. The canonical 24px Line family remains the semantic and geometric source of truth.

## Proof set

Eight candidates were selected because they represent different small-size failure modes:

- **settings** — dense repeated contour + central counter;
- **camera** — compound silhouette + critical counter;
- **refresh** — repeated directional geometry;
- **delete** — stacked structural detail;
- **calendar** — tiny secondary marks;
- **volume** — nested repeated waves;
- **bug** — repeated appendages;
- **file-plus** — base object + semantic overlay.

This is a deliberately representative subset, not the first eight icons that happened to score highly.

## Derivation rules demonstrated

1. Start from the canonical 24px Line master.
2. Identify what disappears first at 12px/16px.
3. Remove secondary detail before changing the primary semantic contour.
4. Preserve the cue that makes the icon identifiable.
5. Enlarge or protect critical counters when they collapse.
6. Reduce competing repeated geometry when it becomes visual noise.
7. Keep Micro names and semantic identity identical to the Line source.
8. Never let Micro become an independent semantic source.

## Real-size review

The generator produces side-by-side Line/Micro comparisons at exactly:

- 12px;
- 16px.

The keyline guide remains 75% of the rendered box. The important review is the actual rendered silhouette, not the mathematical bounds.

Artifacts:

- visual-snapshots/micro-0-1-12.svg
- visual-snapshots/micro-0-1-16.svg
- metadata/micro-audit.json

## What counts as success

Micro 0.1 is successful if the family rules remain stable across different icon types:

- semantic recognition survives simplification;
- secondary detail is removed intentionally;
- critical negative space survives;
- the derivative is measurably simpler;
- canonical Line geometry remains untouched;
- source/derivative mapping is deterministic;
- the same process can be repeated without inventing icon-specific semantics.

The complexity audit is supporting evidence, not a substitute for optical review.

## Next gate

Do **not** convert the remaining 31 review candidates yet.

First review the eight Micro 0.1 derivatives at 12px and 16px, adjust the derivation rules if necessary, then add visual regression assertions around the rules that actually held up.

Only after that should Micro expand to the remaining candidates.


## Micro 0.2 proof lane

Micro 0.2 deliberately expands by failure mode rather than by candidate count. Six derivatives currently prove container/detail, compound-wheel, repeated-stack, diagonal-compound, branch-topology, and radial-repetition behaviour.

Four candidates were reviewed but remain gated because their canonical geometry already carries the minimum semantic structure without an earned Micro change: copy, map, volume-off, and warning. A no-op derivative is not considered progress.

Every Micro manifest is checked by the semantic recognition regression layer in `metadata/micro-semantic.json`. The layer protects primary semantic cues and known forbidden reads; it is a deterministic structural guardrail, not a substitute for native-size visual review.
