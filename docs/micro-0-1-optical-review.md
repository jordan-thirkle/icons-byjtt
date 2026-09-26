# Micro 0.1 — First Optical Review

## Review status

**Pass with one correction.**

The first proof family was reviewed at the actual 12px and 16px render targets, with particular attention to semantic recognition, visual weight, negative space, and whether simplification preserved the canonical cue.

## Findings

| Icon | 12px | 16px | Decision |
|---|---|---|---|
| bug | Reads as a compact insect silhouette; antennae are expendable | Clear | Keep |
| calendar | Frame/header remain strong; date detail was correctly expendable | Clear | Keep |
| camera | Enlarged lens survives better than the canonical counter | Clear | Keep |
| delete | Container/lid remain recognisable; internal slats were noise | Clear | Keep |
| file-plus | File silhouette and plus remain distinct | Clear | Keep |
| refresh | Single directional loop remains a refresh cue without the second competing arrow | Clear | Keep |
| settings | Radial spokes read as brightness/sun rather than settings | Clear after gear correction | **Corrected** |
| volume | Speaker + single wave remains immediately legible | Clear | Keep |

## Rule confirmed

The first review validates an important distinction:

> **Micro is an optical derivation, not a complexity-minimisation pass.**

The derivative should be simpler when secondary detail is noise, but geometry may need to be **rebalanced**, not merely removed. The camera lens is the first example; settings is the second.

## New rule

A Micro derivative fails review if simplification changes the dominant semantic category.

Examples:

- settings → brightness/sun = failure;
- refresh → undo/redo = failure;
- calendar → generic rectangle = failure;
- volume → generic speaker/shape without sound cue = failure.

This semantic-recognition test takes precedence over path-count reduction.

## Gate decision

The eight-icon proof family remains the correct scope.

The corrected settings derivative is the only geometry change required by this first pass.

**Do not expand to the remaining 31 candidates yet.**

Next review should test the corrected eight again after deterministic regeneration, then formalise the semantic-recognition gate before Micro 0.2.
