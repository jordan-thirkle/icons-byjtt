import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import catalogue from "../../metadata/icons.json" with { type: "json" };
import benchmark from "../../metadata/search-benchmark.json" with { type: "json" };

const weights={exact:120,prefix:65,title:40,tag:34,alias:32,related:22,context:22,category:20,semantic:18,text:5,alternative:28,opposite:14,paired:20,intent:32,phrase:46};
const normalize=s=>String(s||"").toLowerCase().normalize("NFKD").replace(/[^a-z0-9\\s-]/g," ").replace(/\\s+/g," ").trim();
const tokens=s=>normalize(s).split(" ").filter(Boolean);
const QUERY_SYNONYMS={"look up":"lookup","look something up":"lookup","find something":"search","magnifying glass":"search","close dialog":"x","close modal":"x","shopping basket":"cart","shopping bag":"bag","artificial intelligence":"ai-agent","AI assistant":"ai-agent","favourite":"heart"};
const intentByTerm=Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync("metadata/ontology.json","utf8")).intentGroups||{}).flatMap(([intent,terms])=>terms.map(term=>[normalize(term),intent])));
const expanded=query=>{const normalized=normalize(query),synonyms=Object.entries(QUERY_SYNONYMS).filter(([phrase])=>normalized.includes(phrase)).flatMap(([,value])=>[value]);return [...new Set([...tokens(normalized),...synonyms,...synonyms.flatMap(q=>JSON.parse(fs.readFileSync("metadata/ontology.json","utf8")).intentGroups?.[q]||[]),...tokens(normalized).flatMap(q=>[...(JSON.parse(fs.readFileSync("metadata/ontology.json","utf8")).intentGroups?.[q]||[]),...(intentByTerm[q]?[...(JSON.parse(fs.readFileSync("metadata/ontology.json","utf8")).intentGroups?.[intentByTerm[q]]||[])]:[])])])};
const entries=catalogue.icons.map(icon=>{const s=icon.semantics||{},r=s.relations||{};return {icon,fields:{name:normalize(icon.name),title:normalize(icon.title),category:normalize(icon.category),tags:(icon.tags||[]).map(normalize),aliases:(icon.aliases||[]).map(normalize),contexts:(icon.contexts||[]).map(normalize),related:(r.related||icon.related||[]).map(normalize),alternative:(r.alternative||[]).map(normalize),opposite:(r.opposite||[]).map(normalize),paired:(r.paired||[]).map(normalize),intents:(s.intents||[]).map(normalize),actions:(s.actions||[]).map(normalize),objects:(s.objects||[]).map(normalize),states:(s.states||[]).map(normalize),queryTerms:(s.queryTerms||[]).map(normalize),text:[icon.name,icon.title,icon.category,...(icon.tags||[]),...(icon.aliases||[]),...(icon.contexts||[]),...(s.intents||[]),...(s.actions||[]),...(s.objects||[]),...(s.states||[])].map(normalize).join(" ")}}});
function score(entry,query){
 const f=entry.fields,q=normalize(query),qt=tokens(q),ex=expanded(q);let total=0;
 if(f.queryTerms.includes(q))total+=weights.phrase;
 for(const t of qt){
  if(f.name===t)total+=weights.exact;else if(f.name.startsWith(t))total+=weights.prefix;
  if(f.title.includes(t))total+=weights.title;if(f.tags.includes(t))total+=weights.tag;if(f.aliases.includes(t))total+=weights.alias;
  if(f.contexts.includes(t))total+=weights.context;if(f.category===t)total+=weights.category;
  if(f.intents.includes(t)||f.actions.includes(t)||f.objects.includes(t)||f.states.includes(t))total+=weights.intent;
  if(f.related.includes(t))total+=weights.related;if(f.alternative.includes(t))total+=weights.alternative;if(f.opposite.includes(t))total+=weights.opposite;if(f.paired.includes(t))total+=weights.paired;if(f.text.includes(t))total+=weights.text;
 }
 for(const t of ex)if(!qt.includes(t)){if(f.queryTerms.includes(t))total+=weights.semantic;if(f.intents.includes(t))total+=weights.intent;if(f.tags.includes(t)||f.aliases.includes(t)||f.contexts.includes(t))total+=weights.semantic;}
 return total;
}
test("natural-language search benchmark resolves expected concepts in top five",()=>{
 for(const item of benchmark.queries){
  const ranked=entries.map(e=>({name:e.icon.name,score:score(e,item.query)})).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
  assert.ok(ranked[0].score>0,`no result for: ${item.query}`);
  assert.ok(ranked.slice(0,5).some(x=>item.expected.includes(x.name)),`expected ${item.expected.join(", ")} for "${item.query}", got ${ranked.slice(0,5).map(x=>x.name).join(", ")}`);
 }
});
