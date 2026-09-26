import assert from "node:assert/strict";

function testPatterns(svg, patterns, label) {
  for (const pattern of patterns ?? []) {
    assert.match(svg, new RegExp(pattern), label + " missing required semantic cue: " + pattern);
  }
}

function testForbidden(svg, patterns, label) {
  for (const pattern of patterns ?? []) {
    assert.doesNotMatch(svg, new RegExp(pattern), label + " retained forbidden semantic regression cue: " + pattern);
  }
}

export function assertSemanticContract(sourceSvg, microSvg, contract, name) {
  assert.equal(typeof contract.primaryCue, "string");
  testPatterns(sourceSvg, contract.requiredPatterns?.source, name + " source");
  testPatterns(microSvg, contract.requiredPatterns?.micro, name + " Micro");
  testForbidden(microSvg, contract.forbiddenPatterns?.micro, name + " Micro");
}

export function assertSemanticMetadataStable(sourceMetadata, microMetadata, name) {
  assert.equal(sourceMetadata.name, name);
  assert.equal(microMetadata.name, name);
  assert.equal(sourceMetadata.title, microMetadata.title);
  assert.deepEqual(sourceMetadata.tags, microMetadata.tags);
  assert.deepEqual(sourceMetadata.contexts, microMetadata.contexts);
  assert.equal(sourceMetadata.accessibility.default, microMetadata.accessibility.default);
}
