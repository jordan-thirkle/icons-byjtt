const normalize = value => String(value || "").toLowerCase().replace(/[^a-z0-9-]+/g, " ").trim();
const words = icon => [...new Set([
  icon.name,
  icon.title,
  icon.category,
  ...(icon.tags || []),
  ...(icon.aliases || []),
  ...(icon.contexts || [])
].flatMap(value => normalize(value).split(/\s+/).filter(Boolean)))];

export function deriveSemantics(icon, ontology = {}) {
  const vocabulary = words(icon);
  const has = terms => terms.some(term => vocabulary.includes(normalize(term)) || icon.name === term);
  const intents = Object.entries(ontology.intentGroups || {})
    .filter(([, terms]) => has(terms))
    .map(([intent]) => intent);

  const actions = (ontology.actionTerms || []).filter(term => has([term]));
  const states = (ontology.stateTerms || []).filter(term => has([term]));
  const objects = (ontology.objectTerms || []).filter(term => has([term]));
  const contextExpansion = [...new Set((icon.contexts || []).flatMap(context => ontology.contextAliases?.[context] || []))];

  const relations = {
    related: [...new Set(icon.related || [])],
    alternative: [],
    opposite: [],
    paired: [],
    state: []
  };

  const opposites = {
    "plus":"minus","minus":"plus","upload":"download","download":"upload",
    "arrow-left":"arrow-right","arrow-right":"arrow-left","arrow-up":"arrow-down","arrow-down":"arrow-up",
    "chevron-left":"chevron-right","chevron-right":"chevron-left","chevron-up":"chevron-down","chevron-down":"chevron-up",
    "lock":"unlock","unlock":"lock","play":"pause","pause":"play","undo":"redo","redo":"undo",
    "volume":"volume-off","volume-off":"volume","heart":"star","star":"heart","user":"users","users":"user",
    "error":"success","success":"error","warning":"success","x":"check"
  };
  if (opposites[icon.name]) relations.opposite.push(opposites[icon.name]);

  const paired = {
    "credit-card":["receipt"],"receipt":["credit-card"],"calendar":["clock"],"clock":["calendar"],
    "camera":["image"],"image":["camera"],"database":["server"],"server":["database"],
    "mail":["message"],"message":["mail"],"file":["folder"],"folder":["file"],
    "download":["upload"],"upload":["download"],"git-branch":["git-commit","git-merge"],
    "git-commit":["git-branch"],"git-merge":["git-branch"]
  };
  if (paired[icon.name]) relations.paired.push(...paired[icon.name]);

  const queryTerms = [...new Set([
    icon.name,
    icon.title,
    ...(icon.tags || []),
    ...(icon.aliases || []),
    ...(icon.contexts || []),
    ...intents,
    ...actions,
    ...states,
    ...objects,
    ...contextExpansion
  ].map(normalize).filter(Boolean))];

  return { intents, actions, states, objects, queryTerms, relations };
}

export function generateCatalogue(metadata, ontology = {}) {
  const icons = [...metadata.icons]
    .sort((a,b) => a.name.localeCompare(b.name))
    .map(icon => ({
      ...icon,
      semantics: deriveSemantics(icon, ontology)
    }));
  return {
    name: metadata.name,
    version: metadata.version,
    license: metadata.license,
    prefix: metadata.prefix,
    baseUrl: metadata.baseUrl,
    family: metadata.family,
    ontologyVersion: ontology.version || null,
    ontology: { intents: ontology.intentGroups || {} },
    icons
  };
}
