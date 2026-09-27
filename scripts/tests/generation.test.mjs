import test from "node:test";
import assert from "node:assert/strict";
import { generateCatalogue } from "../lib/generate-catalogue.mjs";
import { deriveSemantics } from "../lib/generate-catalogue.mjs";
import { generatePackage } from "../lib/generate-package.mjs";
import { generateAiReference } from "../lib/generate-ai-reference.mjs";
import { iconPage, cataloguePage } from "../lib/generate-site.mjs";

const metadata={name:"JTT Icons",version:"1.0.0",license:"MIT",prefix:"jtt",baseUrl:"https://icons.byjtt.com",family:"line",icons:[
  {name:"z",title:"Z",category:"system",tags:["z"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/z.svg",family:"line"},
  {name:"a",title:"A",category:"system",tags:["a"],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/a.svg",family:"line"}
]};
test("catalogue generation is stable and sorted",()=>{const result=generateCatalogue(metadata);assert.deepEqual(result.icons.map(icon=>icon.name),["a","z"]);assert.equal(result.family,"line");});
test("AI reference generation includes canonical semantic paths",()=>{const text=generateAiReference(metadata);assert.match(text,/`a`/);assert.match(text,/`\/icons\/system\/a\.svg`/);});
test("package generation is deterministic and preserves SVG content",()=>{const a=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});const b=generatePackage(metadata,{a:"<svg>a</svg>",z:"<svg>z</svg>"});assert.deepEqual(a,b);assert.match(a["packages/core/icons/a.js"],/svg = "<svg>a<\/svg>"/);});

test("icon pages expose the implementation playground contract",()=>{const page=iconPage(metadata.icons[0],"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M0 0\"/></svg>");assert.match(page,/id="playground"/);assert.match(page,/data-format="react"/);assert.match(page,/data-format="vue"/);assert.match(page,/icons-react/);assert.match(page,/id="pg-download"/);assert.equal(page.includes("src=''"),false);});

test("ontology derives intent, action, object and relationships",()=>{const icon={name:"upload",title:"Upload",category:"actions",tags:["upload","import"],aliases:["import"],contexts:["toolbar"],related:["download"],accessibility:{default:"interactive"},path:"/icons/actions/upload.svg",family:"line"};const ontology={version:"2.0.0",intentGroups:{transfer:["upload","import"]},actionTerms:["upload","import"],objectTerms:["file"],stateTerms:[]};const semantic=deriveSemantics(icon,ontology);assert.deepEqual(semantic.intents,["transfer"]);assert.deepEqual(semantic.actions,["upload","import"]);assert.deepEqual(semantic.relations.related,["download"]);assert.ok(semantic.relations.opposite.includes("download"));});

test("catalogue pages remain crawlable and sequential",()=>{const catalogue={icons:Array.from({length:121},(_,i)=>({name:"icon-"+String(i).padStart(3,"0"),title:"Icon "+i,category:"system",tags:[],aliases:[],contexts:[],related:[],accessibility:{default:"meaningful"},path:"/icons/system/icon.svg",family:"line"}))};const page=cataloguePage(catalogue,2);assert.match(page,/Page 2 of 2/);assert.match(page,/href="\/icons\/page\/1\/"|href="\/" rel="prev"/);assert.match(page,/href="\/icons\/icon-120\//);});
