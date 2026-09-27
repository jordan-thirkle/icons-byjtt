const BASE = "https://icons.byjtt.com";

const USE_CASES = {
  "navigation-icons": {
    title: "Navigation Icons",
    description: "Open-source navigation icons for menus, breadcrumbs, tabs, search, links and moving through digital products.",
    lead: "Use familiar directional and wayfinding concepts without inventing your own icon vocabulary.",
    names: ["arrow-left","arrow-right","arrow-up","arrow-down","chevron-left","chevron-right","chevron-up","chevron-down","menu","home","search","location","map"],
    notes: [
      "Use directional icons when the action itself is spatial or sequential.",
      "Pair icon-only navigation controls with an accessible name.",
      "Keep the same directional meaning consistent across the product."
    ]
  },
  "interface-actions": {
    title: "Interface Action Icons",
    description: "Open-source action icons for creating, editing, confirming, deleting, downloading, uploading and managing interface state.",
    lead: "Common actions should be instantly recognisable and consistent across your product.",
    names: ["plus","edit","check","delete","copy","download","upload","save","refresh","undo","redo","share","filter","sort"],
    notes: [
      "Prefer a familiar action glyph over a decorative metaphor.",
      "Use destructive icons with explicit surrounding labels or confirmation UI.",
      "Keep icon-only controls large enough to operate comfortably."
    ]
  },
  "developer-tools": {
    title: "Developer Tool Icons",
    description: "Open-source icons for developer tools, repositories, terminals, code, infrastructure, bugs and deployment interfaces.",
    lead: "Build developer-facing interfaces from a vocabulary that maps cleanly to engineering concepts.",
    names: ["code","braces","terminal","git-branch","git-commit","git-merge","github","server","database","bug","rocket","settings"],
    notes: [
      "Use repository and version-control icons for concrete engineering concepts.",
      "Use status and utility icons alongside text when the meaning could be ambiguous.",
      "Prefer semantic names so design tokens and AI tooling can discover the same concept."
    ]
  },
  "communication-ui": {
    title: "Communication Icons",
    description: "Open-source icons for messaging, notifications, mail, sharing, reactions and communication workflows.",
    lead: "Make communication states legible without turning every notification into visual noise.",
    names: ["message","mail","bell","send","share","heart","bookmark","info","help"],
    notes: [
      "Use notification icons for state, not as a substitute for the notification message.",
      "Use familiar communication metaphors consistently.",
      "Provide accessible names for meaningful icon-only controls."
    ]
  }
};

const CATEGORY_COPY = {
  actions: "Interface actions for creating, editing, confirming, removing, sharing and moving through work.",
  navigation: "Navigation and wayfinding icons for menus, links, controls, search and interface movement.",
  communication: "Icons for messages, notifications, saved content, reactions and social interactions.",
  media: "Playback, audio, video, camera and media controls for modern interfaces.",
  files: "Files, folders, attachments, documents and the everyday actions around them.",
  objects: "Common interface objects and utilities such as calendars, clocks, maps, links and sorting.",
  people: "Account, profile, team and people icons for identity and collaboration interfaces.",
  commerce: "Shopping, payment, receipts, bags and commerce interface icons.",
  developer: "Developer-focused icons for code, infrastructure, tooling, repositories and deployment.",
  system: "System, status, feedback, settings, warnings and utility states.",
  brands: "Brand and social marks. Third-party marks remain subject to their respective trademark policies."
};

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
}[c]));

const jsonLd = value => JSON.stringify(value).replace(/</g, "\\u003c");

function shell({ title, description, canonical, body, type = "website" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#08090b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="JTT Icons">
<meta name="twitter:card" content="summary">
<title>${escapeHtml(title)}</title>
<style>
:root{color-scheme:dark;--bg:#08090b;--panel:#101216;--panel2:#0d0f13;--line:#252830;--line2:#363b45;--text:#f5f6f8;--muted:#8d94a1;--soft:#c7cbd3}
*{box-sizing:border-box}html{background:var(--bg);scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.wrap{width:min(1320px,calc(100% - 32px));margin:auto}.site-header{height:68px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between}.brand{font-weight:800;letter-spacing:-.04em;text-decoration:none}.nav{display:flex;gap:18px;color:var(--muted)}.nav a{text-decoration:none}.nav a:hover{color:var(--text)}
.kicker{text-transform:uppercase;letter-spacing:.14em;font-size:11px;color:var(--muted)}h1,h2,h3,p{margin-top:0}.hero{padding:76px 0 42px}.hero h1{font-size:clamp(48px,7vw,88px);line-height:.9;letter-spacing:-.075em;max-width:900px;margin:14px 0 22px}.hero p{max-width:680px;color:var(--soft);font-size:18px}.hero-actions{display:flex;gap:8px;margin-top:24px}.primary{background:var(--text);color:var(--bg)}.search-hint{color:var(--muted);font-size:12px;padding:10px 0 2px}.suggestion{border:0;background:none;color:var(--soft);font:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:3px}.suggestion:hover{color:var(--text)}.chip span{opacity:.55}.library-toolbar{display:flex;align-items:center;justify-content:space-between}.sort-control{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px}.sort-control select{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:8px;padding:7px 28px 7px 9px}.discover{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;border-top:1px solid var(--line);padding:55px 0 80px}.discover h2{font-size:34px;letter-spacing:-.05em;margin:8px 0 10px}.discover p{color:var(--soft);max-width:600px}.discover-links{display:grid;align-content:start}.discover-links a{padding:12px 0;border-bottom:1px solid var(--line);text-decoration:none}.discover-links a:hover{color:var(--soft)}.searchbar{position:sticky;top:0;z-index:5;padding:12px 0;background:rgba(8,9,11,.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(37,40,48,.7)}.search-row{display:flex;gap:10px}.searchbox{flex:1;position:relative}.searchbox input{width:100%;height:54px;padding:0 52px 0 18px;border:1px solid var(--line2);border-radius:14px;background:var(--panel);color:var(--text);font:inherit;font-size:16px;outline:none}.searchbox input:focus{border-color:#777f8c;box-shadow:0 0 0 3px rgba(255,255,255,.06)}.shortcut{position:absolute;right:12px;top:15px;border:1px solid var(--line);border-radius:7px;padding:2px 6px;color:var(--muted);font-size:11px}.chips{display:flex;gap:7px;overflow:auto;padding:10px 0 2px;scrollbar-width:none}.chips::-webkit-scrollbar{display:none}.chip{border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);padding:7px 11px;white-space:nowrap;text-decoration:none;font-size:13px}.chip:hover,.chip.active{color:var(--text);border-color:#686f7c;background:var(--panel2)}.count{color:var(--muted);padding:20px 0 10px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-bottom:70px}.card{background:var(--bg);min-height:176px;padding:16px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between}.card:hover{background:var(--panel2)}.card-icon{height:112px;display:grid;place-items:center}.card-icon img{width:52px;height:52px}.name{font-weight:650}.meta{font-size:12px;color:var(--muted);margin-top:2px}.empty{display:none;padding:50px 0;color:var(--muted)}
.page{padding:54px 0 80px}.crumbs{color:var(--muted);font-size:13px;margin-bottom:30px}.crumbs a{text-decoration:none}.detail{display:grid;grid-template-columns:minmax(320px,1fr) minmax(320px,460px);gap:48px;align-items:start}.preview{min-height:480px;border:1px solid var(--line);border-radius:24px;background:radial-gradient(circle at 50% 45%,#15181e 0,#0c0e12 46%,#090a0c 100%);display:grid;place-items:center}.preview svg{width:min(280px,55%);height:auto}.eyebrow{color:var(--muted);text-transform:uppercase;letter-spacing:.12em;font-size:11px}.detail h1{font-size:clamp(44px,6vw,72px);line-height:.92;letter-spacing:-.07em;margin:10px 0 14px}.lede{font-size:18px;color:var(--soft);max-width:620px}.actions{display:flex;gap:8px;flex-wrap:wrap;margin:26px 0}.button{border:1px solid var(--line2);border-radius:10px;background:var(--panel);padding:10px 13px;text-decoration:none;cursor:pointer;color:var(--text);font:inherit}.button:hover{background:#161920}.facts{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:28px 0}.fact{padding:13px 0;border-bottom:1px solid var(--line)}.fact:nth-child(odd){margin-right:18px}.fact:nth-last-child(-n+2){border-bottom:0}.label{display:block;color:var(--muted);font-size:12px;margin-bottom:3px}.tags{display:flex;gap:7px;flex-wrap:wrap}.tag{border:1px solid var(--line);border-radius:999px;padding:5px 9px;color:var(--soft);font-size:12px}.section{margin-top:52px}.section h2{font-size:24px;letter-spacing:-.03em}.code{position:relative;border:1px solid var(--line);border-radius:14px;background:#050608;overflow:auto}.code pre{margin:0;padding:18px;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;color:#dfe3ea}.copy-code{position:absolute;right:10px;top:10px}.related{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}.related a{background:var(--bg);padding:18px;text-decoration:none}.related a:hover{background:var(--panel2)}
.collection-head{max-width:780px;padding:62px 0 36px}.collection-head h1{font-size:clamp(48px,7vw,82px);line-height:.92;letter-spacing:-.075em;margin:12px 0 18px}.collection-head p{font-size:18px;color:var(--soft)}.collection-meta{color:var(--muted)}
footer{border-top:1px solid var(--line);padding:26px 0 50px;color:var(--muted);font-size:13px}.footer-links{display:flex;gap:16px;flex-wrap:wrap}.footer-links a{color:inherit;text-decoration:none}.footer-links a:hover{color:var(--text)}
@media(max-width:760px){.discover{grid-template-columns:1fr}.hero-actions{flex-wrap:wrap}.library-toolbar{align-items:flex-start}.sort-control{margin-top:12px}.nav a:nth-child(n+2){display:none}.hero{padding-top:54px}.detail{grid-template-columns:1fr}.preview{min-height:340px}.facts{grid-template-columns:1fr}.fact,.fact:nth-child(odd),.fact:nth-last-child(-n+2){margin:0;border-bottom:1px solid var(--line)}.fact:last-child{border-bottom:0}.grid{grid-template-columns:repeat(2,1fr)}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
</head>
<body><div class="wrap">
<header class="site-header"><a class="brand" href="/">JTT / ICONS</a><nav class="nav"><a href="/">Library</a><a href="/categories/developer/">Categories</a><a href="/llms.txt">AI</a><a href="https://github.com/jordan-thirkle/icons-byjtt">GitHub</a></nav></header>
${body}
<footer><div>JTT Icons · open-source SVG icons engineered for modern interfaces and AI-assisted development.</div><div class="footer-links"><a href="/">Library</a><a href="/api/icons.json">Catalogue API</a><a href="/llms.txt">AI reference</a><a href="https://github.com/jordan-thirkle/icons-byjtt">Source</a></div></footer>
</div></body></html>`;
}

export function homepage(catalogue) {
  const categories = [...new Set(catalogue.icons.map(i => i.category))].sort();
  const cards = catalogue.icons.map(icon => card(icon)).join("");
  const description = "JTT Icons is an open-source SVG icon library for modern interfaces, developers and AI-assisted development.";
  const categoryCounts = Object.fromEntries(categories.map(category => [category, catalogue.icons.filter(icon => icon.category === category).length]));
  const body = `<main>
<section class="hero"><div class="kicker">Open source · SVG · semantic · machine-readable</div><h1>Find the icon.<br>Ship the interface.</h1><p>A focused, open-source icon library with canonical names, semantic search, copy-ready SVGs and predictable paths.</p><div class="hero-actions"><a class="button primary" href="#library">Browse ${catalogue.icons.length} icons</a><a class="button" href="/docs/">Read the docs</a></div></section>
<section class="searchbar" aria-label="Icon search"><div class="search-row"><div class="searchbox"><input id="q" type="search" autocomplete="off" placeholder="Search by meaning, not just name…" aria-label="Search icons"><span class="shortcut">/</span></div></div><div class="search-hint">Try <button class="suggestion" data-query="close">close</button>, <button class="suggestion" data-query="upload">upload</button>, <button class="suggestion" data-query="account">account</button>, or <button class="suggestion" data-query="developer">developer</button>.</div><div class="chips"><a class="chip active" href="/" data-category="all">All <span>${catalogue.icons.length}</span></a>${categories.map(c=>`<a class="chip" href="/categories/${encodeURIComponent(c)}/">${escapeHtml(c)} <span>${categoryCounts[c]}</span></a>`).join("")}</div></section>
<section id="library" class="library-toolbar"><div class="count" id="count">${catalogue.icons.length} icons</div><div class="sort-control"><label for="sort">Sort</label><select id="sort" aria-label="Sort icons"><option value="relevance">Relevance</option><option value="name">Name</option><option value="category">Category</option></select></div></section>
<section class="grid" id="grid">${cards}</section><p class="empty" id="empty">No icons match that search. Try a broader concept, alias or category.</p>
<section class="discover"><div><div class="kicker">Built for shipping</div><h2>Not just a pretty grid.</h2><p>Every icon has a stable name, semantic metadata, a raw SVG path and a generated package representation. Pick one and get straight to implementation.</p></div><div class="discover-links"><a href="/categories/developer/">Developer icons →</a><a href="/categories/navigation/">Navigation icons →</a><a href="/categories/actions/">Action icons →</a><a href="/llms.txt">AI reference →</a></div></section>
</main>
<script>
const input=document.querySelector("#q"),grid=document.querySelector("#grid"),count=document.querySelector("#count"),empty=document.querySelector("#empty"),sort=document.querySelector("#sort"),cards=[...grid.querySelectorAll(".card")];
const normalize=s=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\\s-]/g," ");
const tokens=s=>normalize(s).split(/\\s+/).filter(Boolean);
function score(card,term){if(!term)return 0;const fields=JSON.parse(card.dataset.fields);const query=tokens(term);let score=0;for(const q of query){if(fields.name===q)score+=100;else if(fields.name.startsWith(q))score+=55;if(fields.title.includes(q))score+=35;if(fields.tags.includes(q))score+=30;if(fields.aliases.includes(q))score+=28;if(fields.contexts.includes(q))score+=20;if(fields.category===q)score+=18;if(fields.text.includes(q))score+=6;}return score;}
function render(){const term=input.value.trim();const ranked=cards.map((card,index)=>({card,index,score:score(card,term)}));const mode=sort.value;ranked.sort((a,b)=>mode==="name"?a.card.dataset.name.localeCompare(b.card.dataset.name):mode==="category"?a.card.dataset.category.localeCompare(b.card.dataset.category)||a.card.dataset.name.localeCompare(b.card.dataset.name):b.score-a.score||a.index-b.index);grid.replaceChildren(...ranked.map(x=>x.card));let visible=0;for(const item of ranked){const hit=!term||item.score>0;item.card.hidden=!hit;if(hit)visible++;}count.textContent=visible+" icon"+(visible===1?"":"s");empty.style.display=visible?"none":"block";const url=new URL(location.href);if(term)url.searchParams.set("q",term);else url.searchParams.delete("q");history.replaceState(null,"",url);}
const initial=new URLSearchParams(location.search).get("q");if(initial)input.value=initial;input.addEventListener("input",render);sort.addEventListener("change",render);document.querySelectorAll(".suggestion").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.query;render();input.focus()}));document.addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement!==input){e.preventDefault();input.focus()}});render();
</script>`;
  return shell({title:"JTT Icons — Open Source SVG Icon Library",description,canonical:BASE+"/",body});
}

function card(icon) {
  const search = [icon.name,icon.title,icon.category,...icon.tags,...icon.aliases,...icon.contexts].join(" ");
  const fields = {name:icon.name,title:icon.title.toLowerCase(),category:icon.category.toLowerCase(),tags:icon.tags.map(x=>x.toLowerCase()),aliases:icon.aliases.map(x=>x.toLowerCase()),contexts:icon.contexts.map(x=>x.toLowerCase()),text:search.toLowerCase()};
  return `<a class="card" href="/icons/${encodeURIComponent(icon.name)}/" data-search="${escapeHtml(search)}" data-fields="${escapeHtml(JSON.stringify(fields))}" data-name="${escapeHtml(icon.name)}" data-category="${escapeHtml(icon.category)}"><div class="card-icon"><img src="${icon.path}" alt="" width="52" height="52" loading="lazy"></div><div><div class="name">${escapeHtml(icon.title)}</div><div class="meta">${escapeHtml(icon.category)} · ${escapeHtml(icon.name)}</div></div></a>`;
}

function iconDescription(icon) {
  const contexts = icon.contexts.length ? icon.contexts.join(", ") : "modern interfaces";
  return `A free open-source ${icon.title.toLowerCase()} SVG icon for ${contexts}. Part of the JTT Icons ${icon.family} family.`;
}

export function iconPage(icon, svg, relatedIcons = []) {
  const description = iconDescription(icon);
  const tags = icon.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const related = relatedIcons.map(item => `<a href="/icons/${encodeURIComponent(item.name)}/"><strong>${escapeHtml(item.title)}</strong><div class="meta">${escapeHtml(item.category)}</div></a>`).join("");
  const svgText = escapeHtml(svg);
  const htmlSnippet = `<img src="${BASE}${icon.path}" alt="${icon.title}">`;
  const body = `<main class="page">
<div class="crumbs"><a href="/">Icons</a> / <a href="/categories/${encodeURIComponent(icon.category)}/">${escapeHtml(icon.category)}</a> / ${escapeHtml(icon.title)}</div>
<div class="detail">
<div class="preview" aria-label="${escapeHtml(icon.title)} icon preview">${svg}</div>
<section>
<div class="eyebrow">${escapeHtml(icon.category)} · ${escapeHtml(icon.family)} family</div>
<h1>${escapeHtml(icon.title)}</h1>
<p class="lede">${escapeHtml(description)}</p>
<div class="actions"><a class="button primary" href="${icon.path}" download>Download SVG</a><button class="button" id="copy-svg">Copy SVG</button><a class="button" href="#usage">Use in code</a></div>
<div class="facts"><div class="fact"><span class="label">Canonical name</span><code>${escapeHtml(icon.name)}</code></div><div class="fact"><span class="label">Direct SVG URL</span><code>${BASE}${icon.path}</code></div><div class="fact"><span class="label">Category</span>${escapeHtml(icon.category)}</div><div class="fact"><span class="label">Family</span>${escapeHtml(icon.family)}</div><div class="fact"><span class="label">Accessibility</span>${escapeHtml(icon.accessibility.default)}</div></div>
<div class="tags">${tags}</div>
</section></div>
<section class="section" id="usage"><h2>Use ${escapeHtml(icon.title)} in your project</h2><p class="lede">The simplest integration is the canonical SVG URL below. For bundlers, use the generated package documented in <a href="/docs/">the docs</a>.</p>
<div class="code"><button class="button copy-code" data-copy="html">Copy</button><pre><code>&lt;img src="${BASE}${icon.path}" alt="${escapeHtml(icon.title)}"&gt;</code></pre></div>

</section>
<section class="section"><h2>Icon metadata</h2><div class="code"><pre><code>${escapeHtml(JSON.stringify(icon,null,2))}</code></pre></div></section>
${related ? `<section class="section"><h2>Related icons</h2><div class="related">${related}</div></section>` : ""}
<section class="section"><h2>Raw SVG</h2><div class="code"><button class="button copy-code" id="copy-svg-2">Copy</button><pre><code>${svgText}</code></pre></div></section>
</main>
<script>
const svg=${JSON.stringify(svg)};
const htmlSnippet=${JSON.stringify(htmlSnippet)};
const copy=async(text,button)=>{try{await navigator.clipboard.writeText(text);const old=button.textContent;button.textContent="Copied";setTimeout(()=>button.textContent=old,1200)}catch{}};
document.querySelector("#copy-svg")?.addEventListener("click",e=>copy(svg,e.currentTarget));
document.querySelector("#copy-svg-2")?.addEventListener("click",e=>copy(svg,e.currentTarget));
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>copy(htmlSnippet,b)));
</script>`;
  const structured = {"@context":"https://schema.org","@type":"WebPage",name:`${icon.title} Icon — JTT Icons`,description,url:`${BASE}/icons/${icon.name}/`,about:{"@type":"ImageObject",name:icon.title,contentUrl:`${BASE}${icon.path}`,license:"https://opensource.org/licenses/MIT"}};
  return shell({title:`${icon.title} Icon — Free SVG — JTT Icons`,description,canonical:`${BASE}/icons/${icon.name}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function docsPage() {
  const description = "JTT Icons documentation: install, use, search, accessibility, licensing and AI discovery.";
  const body = `<main class="page">
<div class="collection-head"><div class="kicker">JTT Icons documentation</div><h1>Ship with JTT Icons.</h1><p>Everything you need to find an icon, copy it into an interface, or consume the generated package.</p></div>
<section class="section"><h2>1. Find</h2><p>Use the library search by name, alias, meaning, context or category. Search is enhanced in the browser while the catalogue remains statically crawlable.</p></section>
<section class="section"><h2>2. Use the SVG</h2><div class="code"><pre><code>&lt;img src="https://icons.byjtt.com/icons/search.svg" alt="Search"&gt;</code></pre></div></section>
<section class="section"><h2>3. Install the package</h2><div class="code"><pre><code>npm install @byjtt/icons</code></pre></div><p>The package is generated from the canonical catalogue and exposes individual icon modules plus the full icon map.</p></section>
<section class="section"><h2>4. Accessibility</h2><p>Each icon carries an accessibility classification in canonical metadata. Decorative icons should be hidden from assistive technology; meaningful icons should receive an appropriate accessible name; interactive controls should use the surrounding control label rather than relying on the glyph alone.</p></section>
<section class="section"><h2>5. AI discovery</h2><p>Agents can use <a href="/llms.txt">llms.txt</a>, <a href="/llms-full.txt">llms-full.txt</a> and <a href="/api/icons.json">the stable catalogue</a>. Match requests against canonical names, aliases, tags and contexts rather than inventing identifiers.</p></section>
<section class="section"><h2>6. License</h2><p>JTT Icons is MIT licensed. Brand marks remain subject to the relevant trademark rights and policies.</p></section>
</main>`;
  return shell({title:"JTT Icons Documentation",description,canonical:BASE+"/docs/",body});
}

export function useCasePage(slug, config, icons) {
  const cards = icons.map(icon => card(icon)).join("");
  const notes = config.notes.map(note => `<li>${escapeHtml(note)}</li>`).join("");
  const faq = [
    [`Which icons belong in ${config.title.toLowerCase()}?`, config.description],
    [`How should these icons be used?`, "Treat the icon as a semantic visual aid, preserve an accessible name for meaningful controls, and keep the surrounding interaction explicit."]
  ].map(([q,a]) => `<div class="section"><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></div>`).join("");
  const body = `<main><section class="collection-head"><div class="kicker">JTT Icons use case</div><h1>${escapeHtml(config.title)}</h1><p>${escapeHtml(config.lead)}</p><div class="collection-meta">${icons.length} curated concepts · open source</div></section>
<section class="section"><h2>Why this collection exists</h2><p>${escapeHtml(config.description)}</p></section>
<section class="section"><h2>Practical guidance</h2><ul>${notes}</ul></section>
<section class="section"><h2>Explore the icon vocabulary</h2><section class="grid">${cards}</section></section>
<section class="section"><h2>Common questions</h2>${faq}</section>
</main>`;
  const structured = {"@context":"https://schema.org","@type":"CollectionPage",name:`JTT Icons — ${config.title}`,description:config.description,url:`${BASE}/use-cases/${slug}/`};
  return shell({title:`${config.title} — JTT Icons`,description:config.description,canonical:`${BASE}/use-cases/${slug}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function categoryPage(category, icons) {
  const title = category.charAt(0).toUpperCase()+category.slice(1);
  const description = CATEGORY_COPY[category] || `Open-source JTT Icons for ${category} interfaces.`;
  const cards = icons.map(icon => card(icon)).join("");
  const body = `<main><section class="collection-head"><div class="kicker">JTT Icons collection</div><h1>Free ${escapeHtml(title)} Icons</h1><p>${escapeHtml(description)}</p><div class="collection-meta">${icons.length} icons · ${escapeHtml(category)} · open source</div></section><section class="grid">${cards}</section></main>`;
  const structured = {"@context":"https://schema.org","@type":"CollectionPage",name:`JTT Icons — ${title}`,description,url:`${BASE}/categories/${category}/`};
  return shell({title:`Free ${title} Icons — JTT Icons`,description,canonical:`${BASE}/categories/${category}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function sitemap(catalogue) {
  const categories = [...new Set(catalogue.icons.map(i=>i.category))].sort();
  const urls = [`${BASE}/`,`${BASE}/docs/`,...categories.map(c=>`${BASE}/categories/${c}/`),...Object.keys(USE_CASES).map(slug=>`${BASE}/use-cases/${slug}/`),...catalogue.icons.map(i=>`${BASE}/icons/${i.name}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join("")}</urlset>\n`;
}

export function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#08090b"/><path d="M15 16h10v32H15zm24 0h10L38 32l11 16H39L28 32z" fill="#f5f6f8"/></svg>\n`;
}

export { escapeHtml };
