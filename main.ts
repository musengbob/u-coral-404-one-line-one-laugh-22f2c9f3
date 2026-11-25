import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const JOKE =
  "I bought a self-help book, but it just told me to buy another self-help book.";

// The kit gate: /output/entry.txt must be UTF-8 text of 1–200 characters,
// not only whitespace.
const GATE = { minChars: 1, maxChars: 200 } as const;

function buildEntryLine(): string {
  const line = JOKE;
  if (line.length < GATE.minChars || line.length > GATE.maxChars) {
    throw new Error(
      `entry line must be ${GATE.minChars}-${GATE.maxChars} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  return line;
}

function resolveOutputPath(): string {
  const envDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_PATH || "";
  if (envDir.trim() !== "") {
    return resolve(envDir);
  }
  return resolve("output");
}

function main(): void {
  const outDir = resolveOutputPath();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), buildEntryLine(), "utf8");
}

main();
