import process from "node:process";
import { validateLibrary } from "./lib/validate-library.mjs";
const result = validateLibrary(process.cwd());
if (result.ok) { console.log("JTT Icons validation passed."); process.exit(0); }
console.error("JTT Icons validation failed.");
for (const error of result.errors) console.error(`- ${error}`);
process.exit(1);
