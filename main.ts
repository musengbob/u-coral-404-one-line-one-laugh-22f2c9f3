import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const JOKE =
  "I bought a self-help book, but it just told me to buy another self-help book.";

function resolveOutputPath(): string {
  const envDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_PATH || "";
  if (envDir.trim() !== "") {
    return resolve(envDir);
  }
  return resolve("output");
}

const outDir = resolveOutputPath();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
