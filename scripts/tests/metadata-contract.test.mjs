import test from "node:test";
import assert from "node:assert/strict";
import catalogue from "../../metadata/icons.json" with { type: "json" };
import categories from "../../metadata/categories.json" with { type: "json" };
import aliases from "../../metadata/aliases.json" with { type: "json" };
import relationships from "../../metadata/relationships.json" with { type: "json" };
const categorySet=new Set(categories.categories);
const names=new Set(catalogue.icons.map(i=>i.name));
test("metadata records satisfy the v1 semantic contract",()=>{
  assert.equal(catalogue.family,"line");
  assert.equal(catalogue.icons.length,12);
  for(const icon of catalogue.icons){
    assert.match(icon.name,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(icon.title);
    assert.ok(categorySet.has(icon.category));
    assert.ok(icon.tags.length>0);
    assert.ok(Array.isArray(icon.aliases));
    assert.ok(Array.isArray(icon.contexts));
    assert.ok(Array.isArray(icon.related));
    assert.ok(["decorative","meaningful","interactive","status","brand"].includes(icon.accessibility.default));
    assert.match(icon.path,/^\/icons\/[a-z0-9-]+\/[a-z0-9-]+\.svg$/);
    assert.equal(icon.family,"line");
    for(const related of icon.related) assert.ok(names.has(related),`missing related icon: ${related}`);
  }
});
test("alias and relationship maps mirror canonical records",()=>{
  for(const icon of catalogue.icons){
    assert.deepEqual(aliases[icon.name],icon.aliases);
    assert.deepEqual(relationships[icon.name],icon.related);
  }
});
