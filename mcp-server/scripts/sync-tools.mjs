// Copies the shared MCP tool definitions from the backend into this package, so the local server and the
// hosted server always expose the same tools. Run after changing backend/src/mcp/lazyrelayTools.ts.
// A backend test (src/mcp/lazyrelayTools.test.ts) fails if the two files differ.
// In the public mirror there is no backend folder: the committed src/tools.ts is used as is.
import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const from = resolve(here, "../../backend/src/mcp/lazyrelayTools.ts");
const to = resolve(here, "../src/tools.ts");
if (existsSync(from)) {
  copyFileSync(from, to);
  console.log(`Copied ${from} -> ${to}`);
} else {
  console.log("No backend folder here (public mirror): keeping the committed src/tools.ts");
}
