import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { sitemap } from "../lib/generate-site.mjs";
import catalogue from "../../metadata/icons.json" with { type: "json" };

test("catalogue homepage is statically crawlable and uses generated catalogue data", () => {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  assert.doesNotMatch(html, /fetch\(["']\/icons\.json/);
  assert.doesNotMatch(html, /const I\s*=\s*\[/);
  assert.ok((html.match(/class="card"/g) || []).length <= 120);
  for (const icon of catalogue.icons.slice(0, 120)) assert.match(html, new RegExp(`href="/icons/${icon.name}/"`));
});

test("category pages are generated for every canonical category", () => {
  const categories = [...new Set(catalogue.icons.map(icon => icon.category))];
  for (const category of categories) {
    const file = path.join(process.cwd(), "categories", category, "index.html");
    assert.ok(fs.existsSync(file), `missing category page: ${category}`);
  }
});

test("sitemap includes every canonical icon page", () => {
  const xml = sitemap(catalogue);
  for (const icon of catalogue.icons) assert.match(xml, new RegExp("/icons/" + icon.name + "/"));
});
