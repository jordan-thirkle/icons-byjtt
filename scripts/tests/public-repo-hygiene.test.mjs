import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const forbiddenNames = new RegExp("(^|/)(node_modules|\\.git|\\.DS_Store|Thumbs\\.db|\\.env(?:\\.|$)|.*\\.(?:pem|key|p12|pfx|tgz|zip|sqlite|db|log|bak|orig))$", "i");
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /(?:ghp|github_pat|xoxb|xoxp)-[A-Za-z0-9_-]{20,}/,
  /(?:sk|pk)_(?:live|test)_[A-Za-z0-9_-]{16,}/i
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll(path.sep, "/");
    if (entry.isDirectory()) {
      if (rel === ".git" || rel === "node_modules") continue;
      out.push(...walk(full));
    } else out.push(rel);
  }
  return out;
}

test("public repository contains no forbidden local or credential artifacts", () => {
  const files = walk(root);
  assert.deepEqual(files.filter(file => forbiddenNames.test(file)), []);
});

test("source does not contain obvious credential material", () => {
  const hits = [];
  for (const file of walk(root)) {
    const full = path.join(root, file);
    let text;
    try { text = fs.readFileSync(full, "utf8"); } catch { continue; }
    for (const pattern of secretPatterns) {
      if (pattern.test(text)) hits.push(file);
    }
  }
  assert.deepEqual(hits, []);
});

test("Vercel deployment is isolated from repository source", () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
  assert.equal(config.outputDirectory, "dist");
  assert.match(config.buildCommand, /prepare-vercel/);
  const prepare = fs.readFileSync(path.join(root, "scripts/prepare-vercel.mjs"), "utf8");
  assert.match(prepare, /"index\.html"/);
  assert.match(prepare, /"icons"/);
  assert.doesNotMatch(prepare, /cpSync\(path\.join\(root, "scripts"/);
  assert.doesNotMatch(prepare, /cpSync\(path\.join\(root, "\.github"/);
});
