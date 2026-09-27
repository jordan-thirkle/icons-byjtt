import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "icons.json"), "utf8"));
const icons = catalogue.icons || [];

const normalize = value => String(value || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9\\s-]/g, " ").replace(/\\s+/g, " ").trim();
const tokens = value => normalize(value).split(" ").filter(Boolean);

function fields(icon) {
  const semantic = icon.semantics || {};
  const relations = semantic.relations || {};
  return {
    name: icon.name,
    title: icon.title,
    category: icon.category,
    tags: icon.tags || [],
    aliases: icon.aliases || [],
    contexts: icon.contexts || [],
    intents: semantic.intents || [],
    actions: semantic.actions || [],
    objects: semantic.objects || [],
    states: semantic.states || [],
    related: relations.related || icon.related || [],
    alternative: relations.alternative || [],
    opposite: relations.opposite || [],
    paired: relations.paired || []
  };
}

function score(icon, query) {
  const q = normalize(query);
  if (!q) return 0;
  const fs = fields(icon);
  const qs = tokens(q);
  const text = Object.values(fs).flatMap(value => Array.isArray(value) ? value : [value]).map(normalize).join(" ");
  let score = 0;
  if (fs.name === q) score += 200;
  if (fs.title.toLowerCase() === q) score += 120;
  if (fs.aliases.map(normalize).includes(q)) score += 100;
  if (fs.tags.map(normalize).includes(q)) score += 90;
  if (fs.intents.map(normalize).includes(q)) score += 80;
  if (fs.actions.map(normalize).includes(q)) score += 70;
  if (fs.objects.map(normalize).includes(q)) score += 70;
  if (fs.states.map(normalize).includes(q)) score += 60;
  for (const token of qs) {
    if (normalize(fs.name).startsWith(token)) score += 45;
    if (text.includes(token)) score += 8;
  }
  return score;
}

function findIcon(name) {
  return icons.find(icon => icon.name === name || (icon.aliases || []).includes(name));
}

function server() {
  const mcp = new McpServer(
    { name: "jtt-icons", version: catalogue.version || "0.1.0" },
    { instructions: "JTT Icons is an SVG-first semantic icon system. Search by intent, retrieve canonical names and implementations, and never invent identifiers. Treat metadata/icons.json and metadata/ontology.json as the canonical identity layer. Prefer exact canonical matches before semantic alternatives. Return the canonical name, integration/import guidance, minimal implementation, accessibility treatment, and source path when appropriate." }
  );

  mcp.registerTool("search_icons", {
    title: "Search JTT Icons",
    description: "Search JTT Icons by meaning, canonical name, alias, tag, context, intent, action, object, state, or relationship. Designed for ChatGPT, Claude, coding agents and other MCP clients.",
    inputSchema: z.object({ query: z.string().min(1), limit: z.number().int().min(1).max(50).default(10) })
  }, async ({ query, limit }) => {
    const results = icons.map(icon => ({ icon, score: score(icon, query) })).filter(x => x.score > 0).sort((a,b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name)).slice(0, limit).map(x => ({ score:x.score, ...fields(x.icon) }));
    return { content:[{type:"text",text:JSON.stringify(results,null,2)}], structuredContent:{query,results} };
  });

  mcp.registerTool("get_icon", {
    title: "Get JTT Icon",
    description: "Retrieve complete metadata and canonical SVG path for one JTT icon.",
    inputSchema: z.object({ name: z.string().min(1) })
  }, async ({ name }) => {
    const icon = findIcon(name);
    if (!icon) return { content:[{type:"text",text:`No canonical JTT icon exists for "${name}". Use search_icons first.`}], isError:true };
    return { content:[{type:"text",text:JSON.stringify(icon,null,2)}], structuredContent:icon };
  });

  mcp.registerTool("get_icon_svg", {
    title: "Get JTT Icon SVG",
    description: "Retrieve raw canonical SVG markup for one JTT icon.",
    inputSchema: z.object({ name: z.string().min(1) })
  }, async ({ name }) => {
    const icon = findIcon(name);
    if (!icon) return { content:[{type:"text",text:`No canonical JTT icon exists for "${name}".`}], isError:true };
    const svgPath = path.join(root, icon.path.replace(/^\//,""));
    const svg = fs.readFileSync(svgPath, "utf8");
    return { content:[{type:"text",text:svg}], structuredContent:{name:icon.name,path:icon.path,svg} };
  });

  mcp.registerTool("recommend_icons", {
    title: "Recommend JTT Icons",
    description: "Return a small semantic shortlist for a UI requirement, including related concepts for comparison.",
    inputSchema: z.object({ requirement: z.string().min(1), limit: z.number().int().min(1).max(12).default(6) })
  }, async ({ requirement, limit }) => {
    const results = icons.map(icon => ({icon,score:score(icon,requirement)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>({name:x.icon.name,title:x.icon.title,category:x.icon.category,reason:"semantic match",related:x.icon.related||[],path:x.icon.path}));
    return { content:[{type:"text",text:JSON.stringify(results,null,2)}], structuredContent:{requirement,results} };
  });

  mcp.registerTool("list_categories", {
    title: "List JTT Icon Categories",
    description: "List available JTT icon categories and counts.",
    inputSchema: z.object({})
  }, async () => {
    const counts = {};
    for (const icon of icons) counts[icon.category] = (counts[icon.category] || 0) + 1;
    return { content:[{type:"text",text:JSON.stringify(counts,null,2)}], structuredContent:{categories:counts} };
  });

  return mcp;
}

export const handler = createMcpHandler(server, { responseMode: "json" });

export default handler;
