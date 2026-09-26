import test from "node:test";
import assert from "node:assert/strict";
import { generateCatalogue } from "../lib/generate-catalogue.mjs";
import { generatePackage } from "../lib/generate-package.mjs";

const metadata={name:"JTT Icons",version:"1.0.0",license:"MIT",prefix:"jtt",baseUrl:"https://icons.byjtt.com",family:"line",icons:[
  {name:"z",title:"Z",category:"system",tags:["z"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/z.svg",family:"line"},
  {name:"a",title:"A",category:"system",tags:["a"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/a.svg",family:"line"}
]};
test("catalogue generation is stable and sorted",()=>{const result=generateCatalogue(metadata);assert.deepEqual(result.icons.map(icon=>icon.name),["a","z"]);assert.equal(result.family,"line");});
test("package generation is deterministic and preserves SVG content",()=>{const a=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});const b=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});assert.deepEqual(a,b);assert.match(a["packages/core/icons/a.js"],/svg = "<svg>a<\/svg>"/);});
