import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Everyday Things, Two Lines, Longer Run — writes the two-line entry to /output/entry.txt.
// Gate: entry.txt must be UTF-8 text of 1 to 400 characters, two lines.
// Line 1 explains an alarm clock to a 10-year-old in one vivid sentence built
// on a single concrete, surprising analogy (a tiny rooster trapped in a box).
// Line 2 says in one sentence what that analogy maps and what it leaves out:
// the loud call at a set time, but not the sun, the batteries, or the snooze.
const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// Gate check: the entry must be 1 to 400 characters of non-whitespace text.
if (text.length < 1 || text.length > 400 || text.trim().length === 0) {
  throw new Error(`entry.txt must be 1-400 characters, got ${text.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
