import test from "node:test";
import assert from "node:assert/strict";
import { validateMetadata } from "../lib/validate-metadata.mjs";
import { validateSvg } from "../lib/validate-svg.mjs";

const valid = { name:"search", title:"Search", category:"navigation", tags:["search"], aliases:[], contexts:["toolbar"], related:[], accessibility:{default:"interactive"}, path:"/icons/navigation/search.svg", family:"line" };
const cats = { categories:["navigation","system","brands"] };

test("metadata rejects invalid category", () => {
  const result = validateMetadata({icons:[{...valid, category:"interface"}]}, cats, {search:[]}, {search:[]});
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /invalid category/);
});
test("metadata rejects malformed name", () => {
  const result = validateMetadata({icons:[{...valid, name:"Search Icon"}]}, cats, {"Search Icon":[]}, {"Search Icon":[]});
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /invalid name/);
});
test("metadata rejects broken relationship", () => {
  const result = validateMetadata({icons:[{...valid, related:["missing"]}]}, cats, {search:[]}, {search:["missing"]});
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /missing related icon/);
});
test("SVG validator rejects legacy stroke weight", () => {
  const result = validateSvg('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></svg>', valid.path);
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /stroke-width/);
});
test("SVG validator rejects external references", () => {
  const result = validateSvg('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="https://example.com/a.svg"/></svg>', valid.path);
  assert.equal(result.ok, false); assert.match(result.errors.join("\n"), /external/);
});
test("SVG validator accepts a canonical line icon", () => {
  const result = validateSvg('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>', valid.path);
  assert.equal(result.ok, true);
});
test("SVG validator accepts a brand silhouette", () => {
  const result = validateSvg('<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0 0 20"/></svg>', "/icons/brands/example.svg");
  assert.equal(result.ok, true);
});
