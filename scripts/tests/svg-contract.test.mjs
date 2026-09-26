import test from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs"; import path from "node:path"; import catalogue from "../../metadata/icons.json" with { type: "json" };
test("canonical line SVGs use the v1 geometry contract",()=>{
 for(const icon of catalogue.icons){const file=path.join(process.cwd(),icon.path.slice(1)); const svg=fs.readFileSync(file,"utf8"); assert.match(svg,/viewBox="0 0 24 24"/); assert.match(svg,/fill="none"/); assert.match(svg,/stroke="currentColor"/); assert.match(svg,/stroke-width="2"/); assert.match(svg,/stroke-linecap="round"/); assert.match(svg,/stroke-linejoin="round"/); assert.doesNotMatch(svg,/<(image|foreignObject)\b/i); assert.doesNotMatch(svg,/(href|xlink:href)=["'][^#]/i); }
});
test("brand geometry may use currentColor fill",()=>{const svg=fs.readFileSync(path.join(process.cwd(),"icons/brands/github.svg"),"utf8"); assert.match(svg,/fill="currentColor"/); assert.doesNotMatch(svg,/stroke=/);});
