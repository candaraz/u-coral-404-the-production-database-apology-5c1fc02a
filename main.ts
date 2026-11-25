// The Production Database Apology — make.fun entry (program/v1, Node 22).
// Copies the apology line in entry.txt (kept beside this file) into the
// directory named by MAKEFUN_OUTPUT_DIR, byte for byte, every run.
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// All paths are resolved from this script's own directory, never the CWD.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Create the output directory if needed, then clear only its contents —
// the directory itself is never removed — so the run is deterministic.
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

copyFileSync(sourcePath, join(outputDir, "entry.txt"));
