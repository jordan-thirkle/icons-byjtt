export function validateMetadata(catalogue, categories, aliases = {}, relationships = {}) {
  const errors = [];
  const allowed = new Set(categories.categories ?? []);
  const names = new Set((catalogue?.icons ?? []).map(icon => icon?.name).filter(Boolean));
  const aliasOwners = new Map();
  const accessibility = new Set(["decorative","meaningful","interactive","status","brand"]);
  const semanticFields = ["intents","actions","states","objects"];
  if (!catalogue || !Array.isArray(catalogue.icons)) return { ok: false, errors: ["metadata.icons must be an array"] };

  for (const icon of catalogue.icons) {
    if (!icon || typeof icon !== "object") { errors.push("icon record must be an object"); continue; }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(icon.name ?? "")) errors.push(`invalid name: ${icon.name}`);
    if (icon.name && [...names].filter(name => name === icon.name).length > 1) errors.push(`duplicate name: ${icon.name}`);
    for (const field of ["title","category","path","family"]) if (typeof icon[field] !== "string" || !icon[field]) errors.push(`${icon.name}: missing ${field}`);
    for (const field of ["tags","aliases","contexts","related"]) if (!Array.isArray(icon[field])) errors.push(`${icon.name}: ${field} must be an array`);
    if (!icon.semantics || typeof icon.semantics !== "object") {
      errors.push(`${icon.name}: missing canonical semantics`);
    } else {
      for (const field of [...semanticFields,"queryTerms"]) {
        if (!Array.isArray(icon.semantics[field])) errors.push(`${icon.name}: semantics.${field} must be an array`);
      }
      const relations = icon.semantics.relations;
      if (!relations || typeof relations !== "object") errors.push(`${icon.name}: missing semantics.relations`);
      else for (const field of ["related","alternative","opposite","paired","state"]) {
        if (!Array.isArray(relations[field])) errors.push(`${icon.name}: semantics.relations.${field} must be an array`);
        else for (const target of relations[field]) if (!names.has(target)) errors.push(`${icon.name}: missing semantic relation ${field} -> ${target}`);
      }
    }
    if (!allowed.has(icon.category)) errors.push(`${icon.name}: invalid category ${icon.category}`);
    if (icon.family !== "line") errors.push(`${icon.name}: unsupported family ${icon.family}`);
    if (!accessibility.has(icon.accessibility?.default)) errors.push(`${icon.name}: invalid accessibility classification`);
    if (!/^\/icons\/[a-z0-9-]+\/[a-z0-9-]+\.svg$/.test(icon.path ?? "")) errors.push(`${icon.name}: invalid canonical path`);
    if (new Set(icon.tags ?? []).size !== (icon.tags ?? []).length) errors.push(`${icon.name}: duplicate tags`);
    for (const alias of icon.aliases ?? []) {
      if (aliasOwners.has(alias)) errors.push(`duplicate alias: ${alias}`); else aliasOwners.set(alias, icon.name);
      if (names.has(alias) && alias !== icon.name) errors.push(`alias collides with canonical name: ${alias}`);
    }
    for (const related of icon.related ?? []) if (!names.has(related)) errors.push(`${icon.name}: missing related icon ${related}`);
    if (JSON.stringify(aliases[icon.name] ?? []) !== JSON.stringify(icon.aliases ?? [])) errors.push(`${icon.name}: alias map drift`);
    if (JSON.stringify(relationships[icon.name] ?? []) !== JSON.stringify(icon.related ?? [])) errors.push(`${icon.name}: relationship map drift`);
  }
  return { ok: errors.length === 0, errors: [...new Set(errors)] };
}
