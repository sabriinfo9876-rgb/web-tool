// JARVIS Patch & Diff Manager
// Generates accurate line-by-line unified diffs (+ / -) and file modification summaries

/**
 * Computes a line-by-line unified diff between original and modified code
 * @param {string} originalCode 
 * @param {string} modifiedCode 
 * @param {string} filename 
 * @returns {object} Diff summary and rendered line chunks
 */
export function computeUnifiedDiff(originalCode = "", modifiedCode = "", filename = "solution.js") {
  const origLines = (originalCode || "").split("\n");
  const modLines = (modifiedCode || "").split("\n");

  const diffChunks = [];
  let additions = 0;
  let deletions = 0;
  let modifications = 0;

  const maxLines = Math.max(origLines.length, modLines.length);

  for (let i = 0; i < maxLines; i++) {
    const orig = origLines[i];
    const mod = modLines[i];

    if (orig === undefined && mod !== undefined) {
      additions++;
      diffChunks.push({
        type: "addition",
        lineNum: i + 1,
        content: "+ " + mod,
      });
    } else if (orig !== undefined && mod === undefined) {
      deletions++;
      diffChunks.push({
        type: "deletion",
        lineNum: i + 1,
        content: "- " + orig,
      });
    } else if (orig !== mod) {
      modifications++;
      diffChunks.push({
        type: "modification-del",
        lineNum: i + 1,
        content: "- " + orig,
      });
      diffChunks.push({
        type: "modification-add",
        lineNum: i + 1,
        content: "+ " + mod,
      });
    } else {
      // Unchanged context line (show nearby lines)
      if (i < 15 || i > maxLines - 15) {
        diffChunks.push({
          type: "unchanged",
          lineNum: i + 1,
          content: "  " + (orig || ""),
        });
      }
    }
  }

  const rawDiff = [
    `--- a/${filename}`,
    `+++ b/${filename}`,
    `@@ -1,${origLines.length} +1,${modLines.length} @@`,
    ...diffChunks.map((c) => c.content),
  ].join("\n");

  return {
    filename,
    additions,
    deletions,
    modifications,
    totalChanges: additions + deletions + modifications,
    diffChunks,
    rawDiff,
  };
}
