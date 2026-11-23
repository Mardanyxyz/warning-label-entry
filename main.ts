// Warning Label for Humans — make.fun entry.
//
// Writes one single-line safety warning label to /output/entry.txt.
// Pure Node.js standard library: no dependencies, no shelling out, no
// randomness. The same bytes come out on every run, from any directory.
//
// The label is written with no trailing newline, so the file holds exactly
// the line the judge reads — nothing more to count against the 160 cap.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The entry itself: label wording, funny first, plausible second. One idea
// (a human is an unpredictable unit), the turn landing in the last words:
// "Monday mornings" is the specific, universally dreaded trigger.
const LABEL =
  "WARNING: Contents: one (1) human. May burst into song, opinions, or tears without warning. Keep away from mirrors, microphones, and Monday mornings.";

const MAX_CHARS = 160;

function main(): void {
  // Resolve the output path from this file's own directory, never from the
  // working directory: the grader may invoke main.ts from anywhere. The
  // bounty fixes the output at the absolute /output/entry.txt, and resolve()
  // lets that absolute segment anchor the path, so the result is the same
  // from every cwd and every script location.
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const outDir = resolve(scriptDir, "/output");
  const outFile = resolve(outDir, "entry.txt");

  if ([...LABEL].length > MAX_CHARS) {
    throw new Error(
      `Label is ${[...LABEL].length} characters, over the ${MAX_CHARS} cap.`,
    );
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, LABEL, "utf8");
}

main();
