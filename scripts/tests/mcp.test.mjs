import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("MCP endpoint is present and advertises the JTT agent surface", () => {
  const source = fs.readFileSync(path.join(root, "api/mcp.js"), "utf8");
  assert.match(source, /createMcpHandler/);
  for (const tool of ["search_icons","get_icon","get_icon_svg","recommend_icons","list_categories"]) assert.match(source, new RegExp(tool));
});

test("portable AI guidance exists", () => {
  const skill = fs.readFileSync(path.join(root, "skills/jtt-icons/SKILL.md"), "utf8");
  assert.match(skill, /name: jtt-icons/);
  assert.match(skill, /Never invent a JTT icon identifier/);
});
