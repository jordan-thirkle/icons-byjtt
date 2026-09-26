# Semantic Recognition Regression

Micro derivatives are not allowed to silently change what an icon depicts. Small-size simplification can remove detail, but it cannot replace the dominant semantic cue with a neighbouring concept.

## Contract

`metadata/micro-semantic.json` is the machine-readable contract. Each icon declares:

- a **primary cue** — the semantic feature that must survive;
- required source patterns — evidence present in the canonical Line master;
- required Micro patterns — the cue that must remain after derivation;
- forbidden Micro patterns — known geometry that caused a semantic regression during review.

The test layer compares the canonical source and Micro SVG against these contracts before the derivative can pass CI.

## What this catches

The first proof caught a real failure: the initial Micro settings treatment used radial spokes and visually read as a brightness/sun symbol. The corrected six-lobe gear restored the settings cue.

This layer is intentionally a **guardrail**, not a semantic classifier. Structural assertions can prove that declared cues remain present and that known failure geometry is absent; they cannot prove universal human recognition. Native-size visual review remains mandatory.

## Expansion rule

A candidate enters the next Micro lane only when:

1. a specific small-size failure mode is identified;
2. the canonical semantic cue is explicitly declared;
3. a derived geometry improves that failure without changing the concept;
4. the semantic regression contract passes;
5. 12px and 16px native-size review passes.

No-op derivatives are not required. If the canonical geometry already survives, the candidate remains gated rather than being duplicated into the Micro family.
