import test from "node:test";
import assert from "node:assert/strict";
import { generateCatalogue } from "../lib/generate-catalogue.mjs";
import { generatePackage } from "../lib/generate-package.mjs";
import { generateAiReference } from "../lib/generate-ai-reference.mjs";
import { iconPage } from "../lib/generate-site.mjs";

const metadata={name:"JTT Icons",version:"1.0.0",license:"MIT",prefix:"jtt",baseUrl:"https://icons.byjtt.com",family:"line",icons:[
  {name:"z",title:"Z",category:"system",tags:["z"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/z.svg",family:"line"},
  {name:"a",title:"A",category:"system",tags:["a"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/a.svg",family:"line"}
]};
test("catalogue generation is stable and sorted",()=>{const result=generateCatalogue(metadata);assert.deepEqual(result.icons.map(icon=>icon.name),["a","z"]);assert.equal(result.family,"line");});
test("AI reference generation includes canonical semantic paths",()=>{const text=generateAiReference(metadata);assert.match(text,/`a`/);assert.match(text,/`\/icons\/system\/a\.svg`/);});
test("package generation is deterministic and preserves SVG content",()=>{const a=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});const b=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});assert.deepEqual(a,b);assert.match(a["packages/core/icons/a.js"],/svg = "<svg>a<\/svg>"/);});

test("icon pages expose the implementation playground contract",()=>{const page=iconPage(metadata.icons[0],"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M0 0\"/></svg>");assert.match(page,/id="playground"/);assert.match(page,/data-format="react"/);assert.match(page,/data-format="vue"/);assert.match(page,/@byjtt\\/icons-react/);assert.match(page,/id="pg-download"/);assert.doesNotMatch(page,/src=''\+/);});
