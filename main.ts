#!/usr/bin/env node
// The Production Database Apology — writes the winning line to /output/entry.txt.
// Node 22, standard library only, zero network. Deterministic: the same bytes
// on every run. The line is exactly 133 characters, with no trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm sorry I deleted the production database. I've started retyping it from memory — I'm on row 4 of 12 million, and it's going great.";

// The gate requires 1–200 characters of UTF-8 text, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${LINE.length} characters, outside the 1–200 gate`);
}

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const dst = join(outDir, "entry.txt");
  writeFileSync(dst, LINE, "utf8");
  // Read it back and fail loudly if the bytes are not exactly the line.
  const back = readFileSync(dst, "utf8");
  if (back !== LINE) {
    throw new Error("entry.txt does not match the line byte-for-byte");
  }
  console.log(`wrote ${dst}`);
}

main();
