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
      alternative: [], opposite: [], paired: [], state: []
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
