import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse as parseJavaScript } from "acorn";
import { parse as parseHtml } from "parse5";

const javaScriptTypes = new Set([
  "module", "application/ecmascript", "application/javascript", "application/x-ecmascript",
  "application/x-javascript", "text/ecmascript", "text/javascript", "text/javascript1.0",
  "text/javascript1.1", "text/javascript1.2", "text/javascript1.3", "text/javascript1.4",
  "text/javascript1.5", "text/jscript", "text/livescript", "text/x-ecmascript", "text/x-javascript",
]);

export function findComments(source) {
  const positions = [];
  const visit = (node) => {
    if (node.nodeName === "#comment") positions.push(node.sourceCodeLocation.startOffset);
    if (node.nodeName === "script" || node.nodeName === "style") {
      for (const child of node.childNodes ?? []) {
        if (child.nodeName !== "#text") continue;
        const offset = child.sourceCodeLocation.startOffset;
        if (node.nodeName === "script") {
          const type = node.attrs.find((attribute) => attribute.name === "type")?.value.toLowerCase().split(";")[0].trim();
          if (type && !javaScriptTypes.has(type)) continue;
          parseJavaScript(child.value, {
            ecmaVersion: "latest",
            sourceType: type === "module" ? "module" : "script",
            onComment: (_block, _value, start) => positions.push(offset + start),
          });
        } else {
          const tokens = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\*[\s\S]*?\*\//g;
          for (const token of child.value.matchAll(tokens)) {
            if (token[0].startsWith("/*")) positions.push(offset + token.index);
          }
        }
      }
    }
    for (const child of node.childNodes ?? []) visit(child);
  };
  visit(parseHtml(source, { sourceCodeLocationInfo: true }));
  return positions.sort((a, b) => a - b);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"])
    .toString().split("\0").filter((file) => file.endsWith(".html") && existsSync(file));
  const failures = files.flatMap((file) => {
    const source = readFileSync(file, "utf8");
    return findComments(source).map((position) => `${file}:${source.slice(0, position).split("\n").length}`);
  });
  const ignore = readFileSync(".gitignore", "utf8");
  failures.push(...ignore.split("\n").flatMap((line, index) => /^\s*#/.test(line) ? [`.gitignore:${index + 1}`] : []));
  if (failures.length) {
    console.error(`Comments are forbidden:\n${failures.join("\n")}`);
    process.exitCode = 1;
  }
}
