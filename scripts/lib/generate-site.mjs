import fs from "node:fs";
import path from "node:path";

const BASE = "https://icons.byjtt.com";
const MONETIZATION = JSON.parse(fs.readFileSync(path.join(process.cwd(), "metadata/monetization.json"), "utf8"));
const AD_HTML = MONETIZATION.enabled && MONETIZATION.provider === "carbon" && MONETIZATION.zoneKey && MONETIZATION.embedHtml ? `<aside class="ad-slot" aria-label="Sponsored">${MONETIZATION.embedHtml}</aside>` : "";

export const USE_CASES = {
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

const CATALOGUE_PAGE_SIZE = 120;

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

function paginationNav(page, totalPages) {
  if (totalPages <= 1) return "";
  const previous = page > 1 ? (page === 2 ? "/" : "/icons/page/" + (page - 1) + "/") : null;
  const next = page < totalPages ? "/icons/page/" + (page + 1) + "/" : null;
  return `<nav class="pagination" aria-label="Icon catalogue pages">${previous ? `<a href="${previous}" rel="prev">← Previous</a>` : "<span></span>"}<span>Page ${page} of ${totalPages}</span>${next ? `<a href="${next}" rel="next">Next →</a>` : "<span></span>"}</nav>`;
}


export const SITE_CSS = " :root{color-scheme:dark;--focus:#d7ff78;--bg:#070809;--panel:#0d1012;--panel2:#111518;--panel3:#151a1d;--line:#20272a;--line2:#344044;--text:#f4f7f5;--muted:#9aa7a5;--soft:#d4dcda;--signal:#c8ff4d;--signal-soft:#e7ffad;--cool:#8bd8ff;--shadow:0 20px 70px rgba(0,0,0,.28)}\n*{box-sizing:border-box}html{background:var(--bg);scroll-behavior:smooth;scroll-padding-top:84px;scrollbar-gutter:stable}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;text-rendering:optimizeLegibility}body:before{content:\"\";position:fixed;inset:0;pointer-events:none;opacity:.035;background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,black,transparent 70%)}a{color:inherit}button,input,select{font:inherit}button,a,input,select{touch-action:manipulation}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid var(--focus);outline-offset:4px}.skip-link{position:fixed;left:16px;top:10px;z-index:100;padding:10px 13px;border-radius:10px;background:var(--signal);color:#081006;transform:translateY(-160%);transition:transform .15s ease}.skip-link:focus{transform:none}.wrap{width:min(1360px,calc(100% - 40px));margin:auto}.site-header{height:72px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;position:relative;z-index:10}.brand{display:inline-flex;align-items:center;min-height:44px;gap:9px;font-weight:850;letter-spacing:-.055em;text-decoration:none}.brand-mark{display:grid;place-items:center;width:24px;height:24px;border:1px solid var(--signal);border-radius:7px;color:var(--signal);font-size:10px;letter-spacing:-.08em}.nav{display:flex;align-items:center;gap:4px;color:var(--muted);overflow:auto;scrollbar-width:none}.nav::-webkit-scrollbar{display:none}.nav a{display:inline-flex;align-items:center;min-height:44px;padding:8px 11px;border-radius:9px;text-decoration:none;white-space:nowrap}.nav a:hover{color:var(--text)}.nav .nav-signal{color:var(--signal)}\n.kicker{text-transform:uppercase;letter-spacing:.15em;font-size:10px;color:var(--signal);font-weight:700}h1,h2,h3,p{margin-top:0}.hero{padding:88px 0 48px;position:relative}.hero:after{content:\"\";position:absolute;right:5%;top:54px;width:180px;height:180px;border:1px solid rgba(200,255,77,.16);border-radius:50%;box-shadow:0 0 0 28px rgba(200,255,77,.025),0 0 0 56px rgba(139,216,255,.018);pointer-events:none}.hero h1{font-size:clamp(48px,7.4vw,96px);line-height:.9;letter-spacing:-.085em;max-width:980px;margin:14px 0 24px}.hero h1 .signal{color:var(--signal)}.hero p{max-width:760px;color:var(--soft);font-size:19px;line-height:1.55}.hero-proof{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 0}.proof{border:1px solid var(--line2);border-radius:999px;background:rgba(13,16,18,.72);padding:6px 10px;color:var(--soft);font-size:12px}.proof b{color:var(--signal);font-weight:700}.hero-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:26px}.primary{background:var(--signal);color:#081006;border-color:var(--signal)}.primary:hover{background:#d8ff78}.secondary{border-color:var(--line2)}.search-hint{color:var(--muted);font-size:12px;padding:10px 0 2px}.suggestion{border:0;background:none;color:var(--soft);font:inherit;cursor:pointer;text-decoration:underline;text-decoration-color:var(--line2);text-underline-offset:3px}.suggestion:hover{color:var(--signal)}.chip span{color:var(--soft);opacity:1}.library-toolbar{display:flex;align-items:center;justify-content:space-between}.sort-control{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px}.sort-control select{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:9px;padding:7px 28px 7px 9px}.discover{display:grid;grid-template-columns:1.25fr 1fr;gap:56px;border-top:1px solid var(--line);padding:64px 0 88px}.discover h2{font-size:38px;letter-spacing:-.055em;margin:8px 0 12px}.discover p{color:var(--soft);max-width:640px}.discover-links{display:grid;align-content:start}.discover-links a{padding:13px 0;border-bottom:1px solid var(--line);text-decoration:none}.discover-links a:after{content:\" ↗\";color:var(--signal);opacity:0;transition:opacity .15s}.discover-links a:hover{color:var(--soft)}.discover-links a:hover:after{opacity:1}.searchbar{position:sticky;top:0;z-index:5;padding:12px 0;background:rgba(7,8,9,.9);backdrop-filter:blur(18px);border-bottom:1px solid rgba(32,39,42,.82)}.search-row{display:flex;gap:10px}.clear-search{border:1px solid var(--line2);border-radius:12px;background:var(--panel);color:var(--muted);padding:0 15px;cursor:pointer;font:inherit}.clear-search:hover{color:var(--text);background:var(--panel2)}.searchbox{flex:1;position:relative}.searchbox input{width:100%;height:58px;padding:0 52px 0 19px;border:1px solid var(--line2);border-radius:15px;background:var(--panel);color:var(--text);font:inherit;font-size:16px;outline:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}.searchbox input:focus{border-color:var(--signal);box-shadow:0 0 0 3px rgba(200,255,77,.08)}.shortcut{position:absolute;right:12px;top:17px;border:1px solid var(--line);border-radius:7px;padding:2px 6px;color:var(--muted);font-size:11px}.chips{display:flex;gap:7px;overflow:auto;padding:10px 0 2px;scrollbar-width:none}.chips::-webkit-scrollbar{display:none}.chip{min-height:40px;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--muted);padding:7px 11px;white-space:nowrap;text-decoration:none;font-size:13px}.chip:hover,.chip.active{color:var(--text);border-color:var(--signal);background:rgba(200,255,77,.06)}.count{color:var(--muted);padding:20px 0 10px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-bottom:36px}.card{content-visibility:auto;contain-intrinsic-size:176px}.card{background:rgba(7,8,9,.9);min-height:176px;padding:16px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;transition:background .15s ease,transform .15s ease}.card:hover{background:var(--panel2);transform:translateY(-1px)}.card:focus-visible{position:relative;z-index:2;background:var(--panel2)}.card-icon{height:112px;display:grid;place-items:center}.card-icon img{width:52px;height:52px}.name{font-weight:650}.meta{font-size:12px;color:var(--muted);margin-top:2px}.empty{display:none;padding:50px 0;color:var(--muted)}\n.page{padding:54px 0 88px}.crumbs{color:var(--muted);font-size:13px;margin-bottom:30px}.crumbs a{text-decoration:none}.crumbs a:hover{color:var(--signal)}.detail{display:grid;grid-template-columns:minmax(320px,1fr) minmax(320px,460px);gap:48px;align-items:start}.preview{min-height:480px;border:1px solid var(--line);border-radius:24px;background:radial-gradient(circle at 50% 45%,#141a17 0,#0c1010 46%,#090a0b 100%);display:grid;place-items:center;box-shadow:var(--shadow)}.preview svg{width:min(280px,55%);height:auto}.eyebrow{color:var(--signal);text-transform:uppercase;letter-spacing:.12em;font-size:11px;font-weight:700}.detail h1{font-size:clamp(44px,6vw,72px);line-height:.92;letter-spacing:-.07em;margin:10px 0 14px}.lede{font-size:18px;color:var(--soft);max-width:620px}.actions{display:flex;gap:8px;flex-wrap:wrap;margin:26px 0}.button{display:inline-flex;align-items:center;justify-content:center;min-height:44px;border:1px solid var(--line2);border-radius:10px;background:var(--panel);padding:9px 14px;text-decoration:none;cursor:pointer;color:var(--text);font:inherit}.button:hover{background:var(--panel2);border-color:#526066}.button.primary{background:var(--signal);color:#081006;border-color:var(--signal)}.button.primary:hover{background:#d8ff78}.button:active{transform:translateY(1px)}.button[disabled],button:disabled{cursor:not-allowed;opacity:.55}.pagination{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;margin:0 0 70px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--muted)}.pagination a{text-decoration:none;color:var(--text)}.pagination a:last-child{text-align:right}.pagination a:hover{text-decoration:underline;text-decoration-color:var(--signal);text-underline-offset:4px}.facts{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:28px 0}.fact{padding:13px 0;border-bottom:1px solid var(--line)}.fact:nth-child(odd){margin-right:18px}.fact:nth-last-child(-n+2){border-bottom:0}.label{display:block;color:var(--muted);font-size:12px;margin-bottom:3px}.tags{display:flex;gap:7px;flex-wrap:wrap}.tag{border:1px solid var(--line);border-radius:999px;padding:5px 9px;color:var(--soft);font-size:12px}.section{margin-top:52px}.section h2{font-size:24px;letter-spacing:-.03em}.code{position:relative;border:1px solid var(--line);border-radius:14px;background:#050608;overflow:auto}.code pre{margin:0;padding:18px;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;color:#dfe3ea}.copy-code{position:absolute;right:10px;top:10px}.related{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}.related a{background:var(--bg);padding:18px;text-decoration:none}.related a:hover{background:var(--panel2)}\n.playground{display:grid;grid-template-columns:minmax(280px,1fr) minmax(320px,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden}.playground-preview{min-height:430px;padding:24px;display:grid;place-items:center;background:#0d1110}.playground-preview svg{width:var(--pg-size,96px);height:var(--pg-size,96px);color:var(--pg-colour,#f4f7f5);stroke-width:var(--pg-stroke,2)}.playground-controls{background:var(--panel);padding:24px}.control{display:grid;gap:7px;margin-top:16px}.control label{font-size:12px;color:var(--muted);display:flex;justify-content:space-between}.control input,.control select{width:100%;height:40px}.code-tabs{display:flex;gap:6px;overflow:auto;padding:0 0 10px}.code-tab{border:1px solid var(--line);background:transparent;color:var(--muted);border-radius:8px;padding:7px 10px;cursor:pointer}.code-tab.active{color:#081006;background:var(--signal);border-color:var(--signal)}.playground-actions{margin-top:12px}.playground-status{min-height:18px;color:var(--muted);font-size:12px}.playground-code{margin-top:18px}.collection-head{max-width:800px;padding:66px 0 38px}.collection-head h1{font-size:clamp(48px,7vw,84px);line-height:.92;letter-spacing:-.075em;margin:12px 0 18px}.collection-head p{font-size:18px;color:var(--soft)}.collection-meta{color:var(--muted)}.section-lead{font-size:17px;color:var(--soft);max-width:720px}.ai-panel{display:grid;grid-template-columns:1.2fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:18px;overflow:hidden}.ai-panel>div{padding:28px;background:var(--panel)}.ai-panel .accent{background:var(--panel2);border-left:2px solid var(--signal)}.badge-row{display:flex;gap:7px;flex-wrap:wrap}.badge{border:1px solid var(--line2);border-radius:999px;padding:5px 9px;font-size:12px;color:var(--soft)}.install-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.install-card{background:var(--panel);padding:22px}.install-card code{color:var(--signal-soft)}.mini-label{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted)}.ad-slot{margin:22px 0;padding:14px;border:1px solid var(--line);border-radius:14px;min-height:20px;color:var(--muted);font-size:12px}.ad-slot:empty{display:none}footer{border-top:1px solid var(--line);padding:28px 0 54px;color:var(--muted);font-size:13px}.footer-links{display:flex;gap:16px;flex-wrap:wrap;margin-top:7px}.footer-links a{color:inherit;text-decoration:none}.footer-links a:hover{color:var(--text)}@media(max-width:760px){.wrap{width:min(100% - 20px,1360px)}.site-header{height:62px;gap:14px}.nav{gap:12px;max-width:64vw}.hero{padding-top:58px}.hero:after{width:110px;height:110px;top:32px;right:0}.hero-actions{flex-wrap:wrap}.library-toolbar{align-items:flex-start}.sort-control{margin-top:12px}.discover{grid-template-columns:1fr}.detail{grid-template-columns:1fr}.preview{min-height:340px}.facts{grid-template-columns:1fr}.fact,.fact:nth-child(odd),.fact:nth-last-child(-n+2){margin:0;border-bottom:1px solid var(--line)}.fact:last-child{border-bottom:0}.grid{grid-template-columns:repeat(2,1fr)}.pagination{grid-template-columns:1fr auto 1fr;font-size:13px}.ai-panel{grid-template-columns:1fr}.ai-panel .accent{border-left:0;border-top:2px solid var(--signal)}.install-grid{grid-template-columns:1fr}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.skip-link{transition:none}*{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}@media(prefers-contrast:more){:root{--line:#515c60;--line2:#718087;--muted:#c6d0cd;--soft:#eef3f0}.chip,.button,.tag,.searchbox input,.sort-control select{border-width:2px}}@media(prefers-color-scheme:light){html:not([data-theme]){color-scheme:light;--bg:#f8fbf9;--panel:#ffffff;--panel2:#eef4f0;--panel3:#e4ece8;--line:#c8d4ce;--line2:#718078;--text:#102018;--muted:#42534b;--soft:#26382f;--signal:#b5ed45;--signal-soft:#d8f9a1;--cool:#005b49;--focus:#075d48}}html[data-theme=light]{color-scheme:light;--bg:#f8fbf9;--panel:#ffffff;--panel2:#eef4f0;--panel3:#e4ece8;--line:#c8d4ce;--line2:#718078;--text:#102018;--muted:#42534b;--soft:#26382f;--signal:#b5ed45;--signal-soft:#d8f9a1;--cool:#005b49;--focus:#075d48}html[data-theme=light] body:before{opacity:.018}.theme-toggle{min-height:44px;border:1px solid var(--line2);border-radius:9px;background:var(--panel);color:var(--text);padding:8px 11px;cursor:pointer}@media(forced-colors:active){.theme-toggle,.button,.chip,.searchbox input,.sort-control select{border:1px solid ButtonText}}@media(prefers-contrast:more){:root{--line:#596862;--line2:#82918a;--muted:#d2dbd7;--soft:#f2f6f4}html[data-theme=light]{--line:#87958f;--line2:#53625b;--muted:#25362d;--soft:#17251e}}html[data-theme=light] .kicker,html[data-theme=light] .nav .nav-signal,html[data-theme=light] .proof b,html[data-theme=light] .eyebrow,html[data-theme=light] .install-card code,html[data-theme=light] .discover-links a:after{color:#397000}html[data-theme=light] .chip:hover,html[data-theme=light] .chip.active{border-color:#397000}@media(prefers-color-scheme:light){html:not([data-theme]) .kicker,html:not([data-theme]) .nav .nav-signal,html:not([data-theme]) .proof b,html:not([data-theme]) .eyebrow,html:not([data-theme]) .install-card code,html:not([data-theme]) .discover-links a:after{color:#397000}html:not([data-theme]) .chip:hover,html:not([data-theme]) .chip.active{border-color:#397000}}";
export const SEARCH_JS = "const ONTOLOGY_INTENTS=window.JTT_ONTOLOGY_INTENTS||{};\\nconst SEARCH_FIELD_WEIGHTS={\"exact\":120,\"prefix\":65,\"title\":40,\"tag\":34,\"alias\":32,\"related\":22,\"context\":22,\"category\":20,\"semantic\":18,\"text\":5,\"alternative\":28,\"opposite\":14,\"paired\":20,\"intent\":32,\"phrase\":46};\\nconst input=document.querySelector(\"#q\"),grid=document.querySelector(\"#grid\"),count=document.querySelector(\"#count\"),empty=document.querySelector(\"#empty\"),sort=document.querySelector(\"#sort\"),cards=[...grid.querySelectorAll(\".card\")],initialCards=[...cards];\\nconst normalize=s=>String(s||\"\").toLowerCase().normalize(\"NFKD\").replace(/[^a-z0-9\\\\s-]/g,\" \").replace(/\\\\s+/g,\" \").trim();\\nconst tokens=s=>normalize(s).split(\" \").filter(Boolean);\\nlet searchIndex=cards.map((card,index)=>({card,index,fields:JSON.parse(card.dataset.fields)}));\nlet allLoaded=cards.length>=120;\nlet loadPromise=null;\nfunction clientCard(icon){\n  const semantic=icon.semantics||{}, relations=semantic.relations||{};\n  const fields={name:icon.name.toLowerCase(),title:icon.title.toLowerCase(),category:icon.category.toLowerCase(),tags:(icon.tags||[]).map(x=>x.toLowerCase()),aliases:(icon.aliases||[]).map(x=>x.toLowerCase()),contexts:(icon.contexts||[]).map(x=>x.toLowerCase()),related:(relations.related||icon.related||[]).map(x=>x.toLowerCase()),alternative:(relations.alternative||[]).map(x=>x.toLowerCase()),opposite:(relations.opposite||[]).map(x=>x.toLowerCase()),paired:(relations.paired||[]).map(x=>x.toLowerCase()),intents:(semantic.intents||[]).map(x=>x.toLowerCase()),actions:(semantic.actions||[]).map(x=>x.toLowerCase()),objects:(semantic.objects||[]).map(x=>x.toLowerCase()),states:(semantic.states||[]).map(x=>x.toLowerCase()),queryTerms:(semantic.queryTerms||[]).map(x=>x.toLowerCase()),text:[icon.name,icon.title,icon.category,...(icon.tags||[]),...(icon.aliases||[]),...(icon.contexts||[]),...(semantic.intents||[]),...(semantic.actions||[]),...(semantic.objects||[]),...(semantic.states||[])].join(\" \").toLowerCase()};\n  const a=document.createElement(\"a\");a.className=\"card\";a.href=\"/icons/\"+encodeURIComponent(icon.name)+\"/\";a.dataset.name=icon.name;a.dataset.category=icon.category;a.dataset.fields=JSON.stringify(fields);\n  const iconWrap=document.createElement(\"div\");iconWrap.className=\"card-icon\";const img=document.createElement(\"img\");img.src=icon.path;img.alt=\"\";img.width=52;img.height=52;img.loading=\"lazy\";iconWrap.append(img);\n  const text=document.createElement(\"div\"),name=document.createElement(\"div\"),meta=document.createElement(\"div\");name.className=\"name\";meta.className=\"meta\";name.textContent=icon.title;meta.textContent=icon.category+\" · \"+icon.name;text.append(name,meta);a.append(iconWrap,text);return a;\n}\nasync function ensureAll(){\n  if(allLoaded)return;\n  if(loadPromise)return loadPromise;\n  loadPromise=fetch(\"/icons.json\",{headers:{\"Accept\":\"application/json\"}}).then(response=>{if(!response.ok)throw new Error(\"catalogue request failed\");return response.json()}).then(data=>{\n    const remoteCards=(data.icons||[]).map(clientCard);\n    grid.replaceChildren(...remoteCards);\n    searchIndex=remoteCards.map((card,index)=>({card,index,fields:JSON.parse(card.dataset.fields)}));\n    allLoaded=true;\n  }).catch(()=>{loadPromise=null;});\n  return loadPromise;\n}\\nconst QUERY_SYNONYMS={\"look up\":\"lookup\",\"look something up\":\"lookup\",\"find something\":\"search\",\"magnifying glass\":\"search\",\"close dialog\":\"x\",\"close modal\":\"x\",\"shopping basket\":\"cart\",\"shopping bag\":\"bag\",\"artificial intelligence\":\"ai-agent\",\"AI assistant\":\"ai-agent\",\"favourite\":\"heart\",\"locked\":\"lock\",\"fullscreen\":\"maximize\"};\\nconst intentByTerm=Object.fromEntries(Object.entries(ONTOLOGY_INTENTS).flatMap(([intent,terms])=>terms.map(term=>[normalize(term),intent])));\\nconst synonymMatches=query=>Object.entries(QUERY_SYNONYMS).filter(([phrase])=>normalize(query).includes(phrase)).map(([phrase,value])=>({phrase,value,tokens:tokens(phrase)}));\nconst semanticTokens=query=>{const normalized=normalize(query),matches=synonymMatches(normalized),synonyms=matches.map(x=>x.value);return [...new Set([...tokens(normalized),...synonyms,...synonyms.flatMap(q=>ONTOLOGY_INTENTS[q]||[]),...tokens(normalized).flatMap(q=>[...(ONTOLOGY_INTENTS[q]||[]),...(intentByTerm[q]?[...ONTOLOGY_INTENTS[intentByTerm[q]]]:[])])])];};\\nfunction score(entry,term){if(!term)return 0;const fields=entry.fields,query=normalize(term),matches=synonymMatches(query),consumed=new Set(matches.flatMap(x=>x.tokens)),queryTokens=tokens(query).filter(q=>!consumed.has(q)),expanded=semanticTokens(query);let total=0;if(query&&fields.queryTerms?.includes(query))total+=SEARCH_FIELD_WEIGHTS.phrase;for(const q of queryTokens){if(fields.name===q)total+=SEARCH_FIELD_WEIGHTS.exact;else if(fields.name.startsWith(q))total+=SEARCH_FIELD_WEIGHTS.prefix;if(fields.title.includes(q))total+=SEARCH_FIELD_WEIGHTS.title;if(fields.tags.includes(q))total+=SEARCH_FIELD_WEIGHTS.tag;if(fields.aliases.includes(q))total+=SEARCH_FIELD_WEIGHTS.alias;if(fields.contexts.includes(q))total+=SEARCH_FIELD_WEIGHTS.context;if(fields.category===q)total+=SEARCH_FIELD_WEIGHTS.category;if(fields.intents?.includes(q))total+=SEARCH_FIELD_WEIGHTS.intent;if(fields.actions?.includes(q))total+=SEARCH_FIELD_WEIGHTS.intent;if(fields.objects?.includes(q))total+=SEARCH_FIELD_WEIGHTS.intent;if(fields.states?.includes(q))total+=SEARCH_FIELD_WEIGHTS.intent;if(fields.related.includes(q))total+=SEARCH_FIELD_WEIGHTS.related;if(fields.alternative.includes(q))total+=SEARCH_FIELD_WEIGHTS.alternative;if(fields.opposite.includes(q))total+=SEARCH_FIELD_WEIGHTS.opposite;if(fields.paired.includes(q))total+=SEARCH_FIELD_WEIGHTS.paired;if(fields.text.includes(q))total+=SEARCH_FIELD_WEIGHTS.text;}for(const q of expanded){if(!queryTokens.includes(q)){if(fields.queryTerms?.includes(q))total+=SEARCH_FIELD_WEIGHTS.semantic;if(fields.intents?.includes(q))total+=SEARCH_FIELD_WEIGHTS.intent;if(fields.tags.includes(q)||fields.aliases.includes(q)||fields.contexts.includes(q))total+=SEARCH_FIELD_WEIGHTS.semantic;}}return total;}\\nfunction render(){const term=input.value.trim();if(!term&&allLoaded){grid.replaceChildren(...initialCards);searchIndex=initialCards.map((card,index)=>({card,index,fields:JSON.parse(card.dataset.fields)}));allLoaded=false;}const ranked=searchIndex.map(entry=>({...entry,score:score(entry,term)}));const mode=sort.value;ranked.sort((a,b)=>mode===\"name\"?a.card.dataset.name.localeCompare(b.card.dataset.name):mode===\"category\"?a.card.dataset.category.localeCompare(b.card.dataset.category)||a.card.dataset.name.localeCompare(b.card.dataset.name):b.score-a.score||a.index-b.index);grid.replaceChildren(...ranked.map(x=>x.card));let visible=0;for(const item of ranked){const hit=!term||item.score>0;item.card.hidden=!hit;if(hit)visible++;}count.textContent=visible+\" icon\"+(visible===1?\"\":\"s\");empty.style.display=visible?\"none\":\"block\";const url=new URL(location.href);if(term)url.searchParams.set(\"q\",term);else url.searchParams.delete(\"q\");history.replaceState(null,\"\",url);}\\nconst initial=new URLSearchParams(location.search).get(\"q\");if(initial){input.value=initial;ensureAll().then(render)}input.addEventListener(\"input\",()=>{if(input.value.trim()&&!allLoaded){count.textContent=\"Loading catalogue…\";ensureAll().then(render)}else render()});sort.addEventListener(\"change\",render);document.querySelectorAll(\".suggestion\").forEach(b=>b.addEventListener(\"click\",()=>{input.value=b.dataset.query;render();input.focus()}));document.querySelector(\"#clear-search\")?.addEventListener(\"click\",()=>{input.value=\"\";render();input.focus()});document.addEventListener(\"keydown\",e=>{if(e.key===\"/\"&&document.activeElement!==input){e.preventDefault();input.focus()}if(e.key===\"Escape\"&&document.activeElement===input){input.value=\"\";render()}});render();";

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
}[c]));

const jsonLd = value => JSON.stringify(value).replace(/</g, "\\u003c");

function breadcrumbJsonLd(items) {
  return {"@type":"BreadcrumbList","itemListElement":items.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,...(item.url?{item:item.url}:{})}))};
}

function shell({ title, description, canonical, body, type = "website" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#070809">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="JTT Icons">
<meta name="twitter:card" content="summary">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="/assets/site.css">
</head>
<body><a class="skip-link" href="#main-content">Skip to content</a><div class="wrap">
<header class="site-header"><a class="brand" href="/" aria-label="JTT Icons home"><span class="brand-mark">J</span><span>JTT Icons</span></a><nav class="nav" aria-label="Primary navigation"><a href="/">Library</a><a href="/docs/">Docs</a><a href="/ai/" class="nav-signal">AI</a><a href="/categories/developer/">Categories</a><a href="https://github.com/jordan-thirkle/icons-byjtt">GitHub</a><button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch colour theme" aria-pressed="false">Theme</button></nav></header>
${AD_HTML}
${body.replace("<main", '<main id="main-content"')}
<footer><div><strong>JTT Icons</strong> · 300 open-source SVG icons, designed for humans and machine-readable for AI-assisted development.</div><div class="footer-links"><a href="/">Library</a><a href="/docs/">Docs</a><a href="/api/icons.json">Catalogue API</a><a href="/llms.txt">AI reference</a><a href="https://github.com/jordan-thirkle/icons-byjtt">Source</a><a href="/LICENSE">MIT License</a></div></footer>
</div><script>(function(){const root=document.documentElement,button=document.querySelector("#theme-toggle");const saved=localStorage.getItem("jtt-theme");if(saved==="light"||saved==="dark")root.dataset.theme=saved;function sync(){if(!button)return;const light=root.dataset.theme==="light";button.textContent=light?"Dark":"Light";button.setAttribute("aria-pressed",String(light));button.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme")}sync();button?.addEventListener("click",()=>{const next=root.dataset.theme==="light"?"dark":"light";root.dataset.theme=next;localStorage.setItem("jtt-theme",next);sync()})})();</script></body></html>`;
}

export function homepage(catalogue) {
  const categories = [...new Set(catalogue.icons.map(i => i.category))].sort();
  const pageIcons = catalogue.icons.slice(0, CATALOGUE_PAGE_SIZE);
  const cards = pageIcons.map(icon => card(icon)).join("");
  const description = "JTT Icons is a free, open-source SVG icon library with 300 canonical icons, semantic search, framework packages and AI-readable metadata for modern interfaces and AI-assisted development.";
  const categoryCounts = Object.fromEntries(categories.map(category => [category, catalogue.icons.filter(icon => icon.category === category).length]));
  const body = `<main>
<section class="hero"><div class="kicker">Open source · SVG · semantic · AI-ready</div><h1>Icons for <span class="signal">people.</span><br>Readable by AI.</h1><p>JTT Icons is a focused open-source SVG icon library for modern interfaces. Search by meaning, copy an icon, install a package, or let an AI tool resolve the same canonical vocabulary.</p><div class="hero-proof"><span class="proof"><b>${catalogue.icons.length}</b> canonical icons</span><span class="proof">MIT licensed</span><span class="proof">SVG-first</span><span class="proof">AI-readable</span><span class="proof">No account required</span></div><div class="hero-actions"><a class="button primary" href="#library">Browse ${catalogue.icons.length} icons</a><a class="button secondary" href="/docs/">Start using JTT</a><a class="button secondary" href="/ai/">For AI agents</a></div></section>
<section class="searchbar" aria-label="Icon search"><div class="search-row"><div class="searchbox"><input id="q" type="search" autocomplete="off" placeholder="Search by meaning, not just name…" aria-label="Search icons"><span class="shortcut">/</span></div><button class="clear-search" id="clear-search" type="button" aria-label="Clear search">Clear</button></div><div class="search-hint">Try <button class="suggestion" data-query="close">close</button>, <button class="suggestion" data-query="upload">upload</button>, <button class="suggestion" data-query="account">account</button>, or <button class="suggestion" data-query="developer">developer</button>.</div><div class="chips"><a class="chip active" href="/" data-category="all">All <span>${catalogue.icons.length}</span></a>${categories.map(c=>`<a class="chip" href="/categories/${encodeURIComponent(c)}/">${escapeHtml(c)} <span>${categoryCounts[c]}</span></a>`).join("")}</div></section>
<section id="library" class="library-toolbar"><div class="count" id="count" aria-live="polite">${catalogue.icons.length} icons</div><div class="sort-control"><label for="sort">Sort</label><select id="sort" aria-label="Sort icons"><option value="relevance">Relevance</option><option value="name">Name</option><option value="category">Category</option></select></div></section>
<section class="grid" id="grid">${cards}</section>${paginationNav(1, Math.ceil(catalogue.icons.length / CATALOGUE_PAGE_SIZE))}<p class="empty" id="empty">No icons match that search. Try a broader concept, alias or category.</p>
<section class="discover"><div><div class="kicker">One vocabulary. Many ways to use it.</div><h2>Designed for humans. Structured for machines.</h2><p>Use JTT the simple way: find an icon, copy the SVG and ship. If you use React, Vue, Svelte or Web Components, install the package. If you use AI, the same names, semantics and relationships are available to the tools helping you build.</p><p class="section-lead">No design-system expertise required. No special workflow required. Start with the icon you need and grow from there.</p></div><div class="discover-links"><a href="/docs/">Learn how to use JTT Icons</a><a href="/use-cases/developer-tools/">Developer tool icons</a><a href="/use-cases/navigation-icons/">Navigation icons</a><a href="/use-cases/interface-actions/">Interface action icons</a><a href="/use-cases/communication-ui/">Communication icons</a><a href="/ai/">AI & agent tooling</a></div></section>
</main>
<script>window.JTT_ONTOLOGY_INTENTS=${JSON.stringify(catalogue.ontology?.intents || {})};</script><script src="/assets/search.js" defer></script>`;
  const structured = {"@context":"https://schema.org","@graph":[{"@type":"WebSite",name:"JTT Icons",url:BASE},{"@type":"CollectionPage",name:"JTT Icons — Open Source SVG Icon Library",description,url:BASE}]};
  return shell({title:"JTT Icons — Open Source SVG Icon Library",description,canonical:BASE+"/",body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

function card(icon) {
  const semantic = icon.semantics || {};
  const relations = semantic.relations || {};
  const search = [icon.name,icon.title,icon.category,...icon.tags,...icon.aliases,...icon.contexts,...(semantic.intents||[]),...(semantic.actions||[]),...(semantic.objects||[]),...(semantic.states||[])].join(" ");
  const fields = {name:icon.name.toLowerCase(),title:icon.title.toLowerCase(),category:icon.category.toLowerCase(),tags:icon.tags.map(x=>x.toLowerCase()),aliases:icon.aliases.map(x=>x.toLowerCase()),contexts:icon.contexts.map(x=>x.toLowerCase()),related:(relations.related||icon.related||[]).map(x=>x.toLowerCase()),alternative:(relations.alternative||[]).map(x=>x.toLowerCase()),opposite:(relations.opposite||[]).map(x=>x.toLowerCase()),paired:(relations.paired||[]).map(x=>x.toLowerCase()),intents:(semantic.intents||[]).map(x=>x.toLowerCase()),actions:(semantic.actions||[]).map(x=>x.toLowerCase()),objects:(semantic.objects||[]).map(x=>x.toLowerCase()),states:(semantic.states||[]).map(x=>x.toLowerCase()),queryTerms:(semantic.queryTerms||[]).map(x=>x.toLowerCase()),text:search.toLowerCase()};
  return `<a class="card" href="/icons/${encodeURIComponent(icon.name)}/" data-search="${escapeHtml(search)}" data-fields="${escapeHtml(JSON.stringify(fields))}" data-name="${escapeHtml(icon.name)}" data-category="${escapeHtml(icon.category)}"><div class="card-icon"><img src="${icon.path}" alt="" width="52" height="52" loading="lazy"></div><div><div class="name">${escapeHtml(icon.title)}</div><div class="meta">${escapeHtml(icon.category)} · ${escapeHtml(icon.name)}</div></div></a>`;
}

function iconDescription(icon) {
  const contexts = icon.contexts.length ? icon.contexts.join(", ") : "modern interfaces";
  const semantics = icon.semantics || {};
  const terms = [...new Set([...(icon.tags || []), ...(icon.aliases || []), ...(semantics.intents || []), ...(semantics.objects || [])])].slice(0, 8);
  const phrase = terms.length ? ` Find it by meaning with terms such as ${terms.join(", ")}.` : "";
  return `Free open-source ${icon.title.toLowerCase()} SVG icon for ${contexts}. Use it in web and app interfaces, or install it through the JTT Icons packages.${phrase}`;
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
<div class="preview" role="img" aria-label="${escapeHtml(icon.title)} icon preview">${svg}</div>
<section>
<div class="eyebrow">${escapeHtml(icon.category)} · ${escapeHtml(icon.family)} family</div>
<h1>${escapeHtml(icon.title)}</h1>
<p class="lede">${escapeHtml(description)}</p>
<div class="actions"><a class="button primary" href="${icon.path}" download>Download SVG</a><button class="button" id="copy-svg">Copy SVG</button><a class="button" href="#usage">Use in code</a></div>
<div class="facts"><div class="fact"><span class="label">Canonical name</span><code>${escapeHtml(icon.name)}</code></div><div class="fact"><span class="label">Direct SVG URL</span><code>${BASE}${icon.path}</code></div><div class="fact"><span class="label">Category</span>${escapeHtml(icon.category)}</div><div class="fact"><span class="label">Family</span>${escapeHtml(icon.family)}</div><div class="fact"><span class="label">Accessibility</span>${escapeHtml(icon.accessibility.default)}</div></div>
<div class="tags">${tags}</div>
</section></div>
${implementationWorkspace(icon, svg)}
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
  const structured = {"@context":"https://schema.org","@graph":[{"@type":"WebPage",name:`${icon.title} Icon — JTT Icons`,description,url:`${BASE}/icons/${icon.name}/`,about:{"@type":"ImageObject",name:icon.title,contentUrl:`${BASE}${icon.path}`,license:"https://opensource.org/licenses/MIT"}},breadcrumbJsonLd([{name:"Icons",url:BASE+"/"},{name:icon.category,url:`${BASE}/categories/${encodeURIComponent(icon.category)}/`},{name:icon.title}])]};
  return shell({title:`${icon.title} Icon — Free SVG — JTT Icons`,description,canonical:`${BASE}/icons/${icon.name}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}


function implementationWorkspace(icon, svg) {
  const hasStroke = /stroke-width=/.test(svg);
  const reactName = "Icon" + icon.name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("");
  const script = [
    "<script>",
    "const PG_SOURCE=" + JSON.stringify(svg) + ";",
    "const PG_TITLE=" + JSON.stringify(icon.title) + ";",
    "const PG_PATH=" + JSON.stringify(icon.path) + ";",
    "const PG_REACT=" + JSON.stringify(reactName) + ";",
    "const PG_STROKE=" + JSON.stringify(hasStroke) + ";",
    "const pg={size:24,colour:'#f5f6f8',stroke:2,bg:'dark',a11y:'meaningful',format:'svg'};",
    "const q=s=>document.querySelector(s);",
    "function pgSvg(){let s=PG_SOURCE.replace('<svg','<svg width=\"'+pg.size+'\" height=\"'+pg.size+'\"');return PG_STROKE?s.replace('stroke-width=\"2\"','stroke-width=\"'+pg.stroke+'\"'):s}",
    "function pgCode(){const svg=pgSvg(),alt=pg.a11y==='meaningful'?PG_TITLE:'';return {svg:svg,html:'<img src=\"'+location.origin+PG_PATH+'\" width=\"'+pg.size+'\" height=\"'+pg.size+'\" alt=\"'+alt+'\">',react:'import { '+PG_REACT+' } from \"@byjtt/icons-react\";\\n\\n<'+PG_REACT+' size={'+pg.size+'} '+(pg.a11y==='meaningful'?'aria-label=\"'+PG_TITLE+'\"':'aria-hidden=\"true\"')+' style={{color: \"'+pg.colour+'\"}}'+(PG_STROKE?' strokeWidth={'+pg.stroke+'}':'')+' />',vue:'<script setup>\\nimport { '+PG_REACT+' } from \"@byjtt/icons-vue\";\\n<\\/script>\\n\\n<template>\\n  <'+PG_REACT+' :size=\"'+pg.size+'\" '+(pg.a11y==='meaningful'?'aria-label=\"'+PG_TITLE+'\"':'aria-hidden=\"true\"')+' color=\"'+pg.colour+'\"'+(PG_STROKE?' :stroke-width=\"'+pg.stroke+'\"':'')+' />\\n</template>'}}",
    "function pgRender(){const p=q('#playground-preview');p.style.setProperty('--pg-size',pg.size+'px');p.style.setProperty('--pg-colour',pg.colour);p.style.setProperty('--pg-stroke',pg.stroke);p.style.background=pg.bg==='light'?'#f5f6f8':pg.bg==='checker'?'repeating-conic-gradient(#171a20 0 25%,#0d0f13 0 50%) 0/20px 20px':'#0d0f13';q('#pg-size-output').textContent=pg.size+'px';q('#pg-code').textContent=pgCode()[pg.format];q('#pg-download').href='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(pgSvg())}",
    "q('#pg-size').oninput=e=>{pg.size=+e.target.value;pgRender()};q('#pg-colour').oninput=e=>{pg.colour=e.target.value;pgRender()};q('#pg-stroke').oninput=e=>{pg.stroke=+e.target.value;pgRender()};q('#pg-bg').onchange=e=>{pg.bg=e.target.value;pgRender()};q('#pg-a11y').onchange=e=>{pg.a11y=e.target.value;pgRender()};",
    "document.querySelectorAll('.code-tab').forEach(b=>b.onclick=()=>{pg.format=b.dataset.format;document.querySelectorAll('.code-tab').forEach(x=>x.classList.toggle('active',x===b));pgRender()});",
    "q('#pg-copy').onclick=async()=>{try{await navigator.clipboard.writeText(pgCode()[pg.format]);q('#pg-status').textContent='Copied.';setTimeout(()=>q('#pg-status').textContent='',1200)}catch{q('#pg-status').textContent='Copy failed.'}};pgRender();",
    "</script>"
  ].join("");
  return [
    '<section class="section" id="playground">',
    '<div class="eyebrow">Implementation workspace</div>',
    '<h2>Make it yours. Ship it.</h2>',
    '<p class="lede">Tune size, colour, stroke and accessibility, then copy the implementation you need.</p>',
    '<div class="playground"><div class="playground-preview" id="playground-preview">', svg, '</div>',
    '<div class="playground-controls"><div class="control"><label>Size <output id="pg-size-output">24px</output></label><input id="pg-size" type="range" min="12" max="160" value="24"></div>',
    '<div class="control"><label>Colour</label><input id="pg-colour" type="color" value="#f5f6f8"></div>',
    '<div class="control"><label>Stroke <output id="pg-stroke-output">', hasStroke ? '2' : 'Fixed', '</output></label><input id="pg-stroke" type="range" min="1" max="3" step=".25" value="2" ', hasStroke ? '' : 'disabled', '></div>',
    '<div class="control"><label>Background</label><select id="pg-bg"><option value="dark">Dark</option><option value="light">Light</option><option value="checker">Checker</option></select></div>',
    '<div class="control"><label>Accessibility</label><select id="pg-a11y"><option value="meaningful">Meaningful</option><option value="decorative">Decorative</option></select></div></div></div>',
    '<div class="playground-code"><div class="code-tabs"><button class="code-tab active" data-format="svg">SVG</button><button class="code-tab" data-format="html">HTML</button><button class="code-tab" data-format="react">React</button><button class="code-tab" data-format="vue">Vue</button></div>',
    '<div class="code"><button class="button copy-code" id="pg-copy">Copy</button><pre><code id="pg-code"></code></pre></div>',
    '<div class="playground-actions"><a class="button" id="pg-download" download>Download configured SVG</a></div><p class="playground-status" id="pg-status" role="status" aria-live="polite"></p></div>',
    '</section>',
    script
  ].join("");
}
export function aiPage() {
  const description = "JTT Icons is an open-source SVG icon library built for people and AI tools: semantic icon search, canonical names, MCP, Agent Skills, packages and raw SVG.";
  const body = `<main class="page">
<section class="collection-head"><div class="kicker">AI-ready icon infrastructure</div><h1>Give people and AI the same icon vocabulary.</h1><p>JTT Icons keeps icon names, meaning, relationships and SVG paths consistent across the library, code, design tools and AI agents.</p></section>
<section class="ai-panel"><div><div class="mini-label">For developers</div><h2>Search by what you mean.</h2><p class="section-lead">Ask for “an icon for uploading a file” instead of remembering an identifier. Search understands names, aliases, contexts and semantic relationships, then resolves to a canonical icon.</p><div class="badge-row"><span class="badge">Natural-language search</span><span class="badge">Canonical names</span><span class="badge">Raw SVG</span><span class="badge">React · Vue · Svelte · Web</span></div></div><div class="accent"><div class="mini-label">For AI tools</div><h2>Resolve, don't guess.</h2><p class="section-lead">Use the public catalogue, Agent Skill or MCP interface to discover an icon and return its canonical name, metadata or SVG. The same source powers the human-facing library.</p><div class="badge-row"><span class="badge">MCP</span><span class="badge">Agent Skill</span><span class="badge">llms.txt</span><span class="badge">JSON catalogue</span></div></div></section>
<section class="section"><h2>Start with the simplest interface</h2><div class="discover-links">
<a href="/api/mcp/">MCP interface → Search and retrieve JTT Icons from compatible AI tools</a>
<a href="/skills/jtt-icons/SKILL.md">Agent Skill → Give an agent portable JTT Icons instructions</a>
<a href="/llms.txt">llms.txt → Concise machine-readable entry point</a>
<a href="/llms-full.txt">Full AI reference → Canonical catalogue and implementation details</a>
<a href="/api/icons.json">JSON catalogue → Stable machine-readable source</a>
<a href="/docs/ai-agents.md">Agent documentation → Integration guidance</a>
</div></section>
<section class="section"><h2>What stays canonical</h2><p class="section-lead">Every consumer resolves the same icon identity: canonical name, SVG path, metadata, aliases, contexts, ontology and relationships. AI can help choose the icon; JTT still gives the exact asset to ship.</p></section>
</main>`;
  const structured = {"@context":"https://schema.org","@type":"WebPage",name:"JTT Icons for AI Agents and Developers",description,url:`${BASE}/ai/`};
  return shell({title:"JTT Icons for AI Agents — Semantic SVG Icons",description,canonical:BASE+"/ai/",body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function docsPage() {
  const description = "JTT Icons documentation for finding, downloading, installing and using open-source SVG icons in web projects, design tools and AI-assisted development.";
  const body = `<main class="page">
<div class="collection-head"><div class="kicker">Documentation</div><h1>Use an icon in minutes.</h1><p>JTT Icons is deliberately simple. Download one SVG, copy it into a project, install a package, or let your AI tool find the right icon.</p></div>
<section class="install-grid"><div class="install-card"><div class="mini-label">1 · Fastest</div><h2>Download SVG</h2><p>Open any icon, copy its SVG or download the file. No build tool and no account required.</p><code>&lt;img src="/icons/navigation/search.svg"&gt;</code></div><div class="install-card"><div class="mini-label">2 · Developers</div><h2>Install a package</h2><p>Use the generated package that matches your stack while keeping the same canonical icon names.</p><code>npm install @byjtt/icons-react</code></div><div class="install-card"><div class="mini-label">3 · AI</div><h2>Search by meaning</h2><p>Use natural-language search, the JSON catalogue, Agent Skill or MCP instead of guessing icon names.</p><code>search → resolve → ship</code></div></section>
<section class="section"><h2>Find an icon</h2><p>Search by name, alias, category, context or meaning. Try phrases such as “upload”, “close”, “developer”, “account” or “notification”. JTT keeps the canonical name visible so you can use the same icon again.</p></section>
<section class="section"><h2>Use the SVG</h2><p>Every icon has a stable public SVG path. For meaningful images, provide an appropriate accessible name. For decorative icons, hide them from assistive technology. For icon-only controls, label the control itself rather than relying on the glyph.</p><div class="code"><pre><code>&lt;img src="https://icons.byjtt.com/icons/navigation/search.svg" alt="Search"&gt;</code></pre></div></section>
<section class="section"><h2>Install for your stack</h2><p>The generated packages are built from the same canonical catalogue.</p><div class="code"><pre><code>npm install @byjtt/icons
npm install @byjtt/icons-react
npm install @byjtt/icons-vue
npm install @byjtt/icons-svelte</code></pre></div><p>Web Components are available from the generated <code>@byjtt/icons-web</code> package.</p></section>
<section class="section"><h2>Build with AI</h2><p>AI-assisted development works better when identifiers are predictable. Give an agent the JTT catalogue or use the MCP interface so it can search by intent, resolve a canonical name and retrieve the exact SVG or framework implementation.</p><div class="actions"><a class="button primary" href="/ai/">Explore AI tooling</a><a class="button" href="/llms.txt">Read llms.txt</a></div></section>
<section class="section"><h2>Accessibility</h2><p>JTT Icons targets WCAG 2.2 AA across the public interface, with keyboard navigation, visible focus, high-contrast themes, reduced-motion support, forced-colour support and responsive reflow built into the design system.</p><p><a class="button" href="/docs/ACCESSIBILITY.md">Read the accessibility baseline</a></p></section>
<section class="section"><h2>License and trademarks</h2><p>JTT Icons is MIT licensed. Third-party brand marks are included as reference assets where applicable and remain subject to their respective trademark rights and policies.</p></section>
</main>`;
  return shell({title:"JTT Icons Documentation — Use Open-Source SVG Icons",description,canonical:BASE+"/docs/",body});
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
  const structured = {"@context":"https://schema.org","@graph":[{"@type":"CollectionPage",name:`JTT Icons — ${config.title}`,description:config.description,url:`${BASE}/use-cases/${slug}/`},breadcrumbJsonLd([{name:"Icons",url:BASE+"/"},{name:config.title}])]};
  return shell({title:`${config.title} — JTT Icons`,description:config.description,canonical:`${BASE}/use-cases/${slug}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function cataloguePage(catalogue, page) {
  const totalPages = Math.max(1, Math.ceil(catalogue.icons.length / CATALOGUE_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * CATALOGUE_PAGE_SIZE;
  const icons = catalogue.icons.slice(start, start + CATALOGUE_PAGE_SIZE);
  const body = `<main><section class="collection-head"><div class="kicker">JTT Icons library</div><h1>Open Source SVG Icons</h1><p>Browse the JTT Icons catalogue by stable canonical name and semantic category.</p><div class="collection-meta">${catalogue.icons.length} icons · page ${safePage} of ${totalPages}</div></section><section class="grid">${icons.map(icon => card(icon)).join("")}</section>${paginationNav(safePage,totalPages)}</main>`;
  const structured = {"@context":"https://schema.org","@type":"CollectionPage",name:`JTT Icons — Page ${safePage}`,description:"Browse the JTT Icons open-source SVG catalogue.",url:safePage===1?`${BASE}/`:`${BASE}/icons/page/${safePage}/`};
  return shell({title:safePage===1?"JTT Icons — Open Source SVG Icon Library":`JTT Icons — Icon Library Page ${safePage}`,description:"Browse the JTT Icons open-source SVG catalogue.",canonical:structured.url,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function categoryPage(category, icons) {
  const title = category.charAt(0).toUpperCase()+category.slice(1);
  const description = CATEGORY_COPY[category] || `Open-source JTT Icons for ${category} interfaces.`;
  const cards = icons.map(icon => card(icon)).join("");
  const body = `<main><section class="collection-head"><div class="kicker">JTT Icons collection</div><h1>Free ${escapeHtml(title)} Icons</h1><p>${escapeHtml(description)}</p><div class="collection-meta">${icons.length} icons · ${escapeHtml(category)} · open source</div></section><section class="grid">${cards}</section></main>`;
  const structured = {"@context":"https://schema.org","@graph":[{"@type":"CollectionPage",name:`JTT Icons — ${title}`,description,url:`${BASE}/categories/${category}/`},breadcrumbJsonLd([{name:"Icons",url:BASE+"/"},{name:title}])]};
  return shell({title:`Free ${title} Icons — JTT Icons`,description,canonical:`${BASE}/categories/${category}/`,body:body.replace("</main>",`</main><script type="application/ld+json">${jsonLd(structured)}</script>`)});
}

export function sitemap(catalogue) {
  const categories = [...new Set(catalogue.icons.map(i=>i.category))].sort();
  const pages = Array.from({ length: Math.max(1, Math.ceil(catalogue.icons.length / CATALOGUE_PAGE_SIZE)) - 1 }, (_, index) => `${BASE}/icons/page/${index + 2}/`);
  const urls = [`${BASE}/`,`${BASE}/docs/`,`${BASE}/ai/`,...pages,...categories.map(c=>`${BASE}/categories/${c}/`),...Object.keys(USE_CASES).map(slug=>`${BASE}/use-cases/${slug}/`),...catalogue.icons.map(i=>`${BASE}/icons/${i.name}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join("")}</urlset>\n`;
}

export function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#08090b"/><path d="M15 16h10v32H15zm24 0h10L38 32l11 16H39L28 32z" fill="#f5f6f8"/></svg>\n`;
}

export { escapeHtml };
