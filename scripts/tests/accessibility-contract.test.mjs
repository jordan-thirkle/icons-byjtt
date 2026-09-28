import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "scripts/lib/generate-site.mjs"), "utf8");

test("website accessibility contract is present in the generated source", () => {
  for (const required of [
    'lang="en"',
    'Skip to content',
    'aria-label="Primary navigation"',
    'aria-live="polite"',
    'aria-label="Search icons"',
    'theme-toggle',
    'focus-visible',
    'prefers-reduced-motion',
    'forced-colors',
    'prefers-contrast'
  ]) assert.ok(source.includes(required), "missing accessibility contract: " + required);
});

test("interactive controls use comfortable minimum hit areas", () => {
  const cssStart = source.indexOf("export const SITE_CSS = ");
  const cssEnd = source.indexOf("export const SEARCH_JS = ", cssStart);
  const css = source.slice(cssStart, cssEnd);
  assert.match(css, /min-height:44px/);
  assert.ok(css.includes(".chip{min-height:40px"), "chips must have a 40px minimum hit area");
  assert.ok(css.includes("outline:3px solid var(--focus)"), "focus indicator must be explicit");
});

test("light theme preserves a distinct high-contrast text and link system", () => {
  const cssStart = source.indexOf("export const SITE_CSS = ");
  const cssEnd = source.indexOf("export const SEARCH_JS = ", cssStart);
  const css = source.slice(cssStart, cssEnd);
  assert.match(css, /html\\[data-theme="light"\\]/);
  assert.match(css, /--text:#102018/);
  assert.match(css, /--link:#005b49/);
  assert.match(css, /--focus:#075d48/);
});
