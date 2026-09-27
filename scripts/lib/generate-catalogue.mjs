const normalize = value => String(value || "").toLowerCase().replace(/[^a-z0-9-]+/g, " ").trim();

export function deriveSemantics(icon, ontology = {}) {
  if (icon.semantics && typeof icon.semantics === "object") {
    const semantic = icon.semantics;
    const relations = semantic.relations || {};
    return {
      intents: [...new Set(semantic.intents || [])],
      actions: [...new Set(semantic.actions || [])],
      states: [...new Set(semantic.states || [])],
      objects: [...new Set(semantic.objects || [])],
      queryTerms: [...new Set(
        (semantic.queryTerms || [
          icon.name,
          icon.title,
          ...(icon.tags || []),
          ...(icon.aliases || []),
          ...(icon.contexts || [])
        ]).map(normalize).filter(Boolean)
      )],
      relations: {
        related: [...new Set(relations.related || icon.related || [])],
        alternative: [...new Set(relations.alternative || [])],
        opposite: [...new Set(relations.opposite || [])],
        paired: [...new Set(relations.paired || [])],
        state: [...new Set(relations.state || [])]
      }
    };
  }

  // Migration fallback for older records. Validation rejects missing canonical
  // semantics, so new/updated icons cannot silently depend on this path.
  const vocabulary = [...new Set([
    icon.name, icon.title, icon.category,
    ...(icon.tags || []), ...(icon.aliases || []), ...(icon.contexts || [])
  ].flatMap(value => normalize(value).split(/\s+/).filter(Boolean)))];
  const has = terms => terms.some(term => vocabulary.includes(normalize(term)) || icon.name === term);
  const intents = Object.entries(ontology.intentGroups || {})
    .filter(([, terms]) => has(terms))
    .map(([intent]) => intent);
  const actions = (ontology.actionTerms || []).filter(term => has([term]));
  const states = (ontology.stateTerms || []).filter(term => has([term]));
  const objects = (ontology.objectTerms || []).filter(term => has([term]));
  const contextExpansion = [...new Set((icon.contexts || []).flatMap(context => ontology.contextAliases?.[context] || []))];
  const opposites = {
    "plus":"minus","minus":"plus","upload":"download","download":"upload",
    "arrow-left":"arrow-right","arrow-right":"arrow-left","arrow-up":"arrow-down","arrow-down":"arrow-up",
    "chevron-left":"chevron-right","chevron-right":"chevron-left","chevron-up":"chevron-down","chevron-down":"chevron-up",
    "lock":"unlock","unlock":"lock","play":"pause","pause":"play","undo":"redo","redo":"undo",
    "volume":"volume-off","volume-off":"volume","heart":"star","star":"heart","user":"users","users":"user",
    "error":"success","success":"error","warning":"success","x":"check"
  };
  const paired = {
    "credit-card":["receipt"],"receipt":["credit-card"],"calendar":["clock"],"clock":["calendar"],
    "camera":["image"],"image":["camera"],"database":["server"],"server":["database"],
    "mail":["message"],"message":["mail"],"file":["folder"],"folder":["file"],
    "download":["upload"],"upload":["download"],"git-branch":["git-commit","git-merge"],
    "git-commit":["git-branch"],"git-merge":["git-branch"]
  };
  return {
    intents,
    actions,
    states,
    objects,
    queryTerms: [...new Set([
      icon.name, icon.title, ...(icon.tags || []), ...(icon.aliases || []),
      ...(icon.contexts || []), ...intents, ...actions, ...states, ...objects,
      ...contextExpansion
    ].map(normalize).filter(Boolean))],
    relations: {
      related: [...new Set(icon.related || [])],
      alternative: [],
      opposite: opposites[icon.name] ? [opposites[icon.name]] : [],
      paired: paired[icon.name] || [],
      state: []
    }
  };
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
