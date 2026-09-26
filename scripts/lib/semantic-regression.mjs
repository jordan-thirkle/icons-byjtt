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
