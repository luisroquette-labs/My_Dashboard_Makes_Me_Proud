import assert from "node:assert/strict";
import test from "node:test";
import { findComments } from "./check-comments.mjs";

test("allows URLs and comment markers in strings", () => {
  assert.deepEqual(findComments('<a href="https://example.com" data-label="<!-- literal -->">Link</a><script>const value = "// text"; const re = /[//]/;</script><script type="module">export const x = 1;</script><script type="application/ld+json">{"@context":"https://schema.org"}</script>'), []);
});

test("rejects HTML, CSS and JavaScript comments", () => {
  const source = '<!-- section --><style>/* color */</style><script>// logic\nconst value = `${fn(/* hidden */ 1)}`;</script><script type="module">// module\nexport const x = 1;</script><script type="text/ecmascript">// typed\n</script><script type="application/javascript; charset=utf-8">/* typed */</script>';
  assert.equal(findComments(source).length, 7);
});
