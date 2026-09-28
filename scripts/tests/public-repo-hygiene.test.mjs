import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function ratio(hexA, hexB) {
  const channel = h => {
    const n = Number.parseInt(h, 16) / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  const lum = hex => {
    const h = hex.replace("#", "");
    return 0.2126 * channel(h.slice(0,2)) + 0.7152 * channel(h.slice(2,4)) + 0.0722 * channel(h.slice(4,6));
  };
  const [a,b] = [lum(hexA),lum(hexB)].sort((x,y)=>y-x);
  return (a+0.05)/(b+0.05);
}

test("public repository contains no obvious secret or local artifacts", () => {
  const forbidden = /(^|\/)(node_modules|\.git|\.DS_Store|Thumbs\.db|\.env(?:\.|$)|.*\.(?:pem|key|p12|pfx|tgz|zip|sqlite|db|log|bak|orig))$/i;
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => {
    const full=path.join(dir,entry.name);
    const rel=path.relative(root,full).replaceAll(path.sep,"/");
    return entry.isDirectory() ? ((rel===".git"||rel==="node_modules")?[]:walk(full)) : [rel];
  });
  assert.deepEqual(walk(root).filter(p=>forbidden.test(p)),[]);
});

test("public CSS palette meets AA contrast targets", () => {
  const css=fs.readFileSync(path.join(root,"assets/site.css"),"utf8");
  const readTheme = (theme) => {
    const block = theme === "dark"
      ? css.slice(0, css.indexOf("html[data-theme=light]"))
      : css.slice(css.indexOf("html[data-theme=light]"));
    return Object.fromEntries([...block.matchAll(/--([a-z-]+):(#[0-9a-f]{6})/gi)].map(m=>[m[1],m[2]]));
  };
  const dark = readTheme("dark");
  const light = readTheme("light");
  for(const [fg,bg,min] of [["text","bg",4.5],["muted","bg",4.5],["soft","bg",4.5],["signal","bg",4.5],["text","panel",4.5],["muted","panel",4.5],["soft","panel",4.5],["signal","bg",4.5]]) {
    assert.ok(ratio(dark[fg],dark[bg])>=min, `dark ${fg} on ${bg} contrast below ${min}:1`);
  }
  for(const [fg,bg,min] of [["text","bg",4.5],["muted","bg",4.5],["soft","bg",4.5],["signal","bg",4.5],["text","panel",4.5],["muted","panel",4.5],["soft","panel",4.5],["signal","bg",3]]) {
    assert.ok(ratio(light[fg],light[bg])>=min, `light ${fg} on ${bg} contrast below ${min}:1`);
  }
  assert.ok(ratio("#081006",dark.signal)>=4.5,"dark primary button text must contrast with signal");
  assert.ok(ratio("#f8fbf9",light.signal)>=4.5,"light primary button text must contrast with signal");
});
