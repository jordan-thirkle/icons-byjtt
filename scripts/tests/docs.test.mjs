import test from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs"; import path from "node:path";
const required=[["design-principles.md","24 × 24"],["naming.md","kebab-case"],["accessibility.md","decorative"],["contributing.md","npm run check"]];
test("design-system documentation covers required rules",()=>{for(const [file,needle] of required){const text=fs.readFileSync(path.join(process.cwd(),"docs",file),"utf8");assert.ok(text.includes(needle),`${file} missing ${needle}`);}});
