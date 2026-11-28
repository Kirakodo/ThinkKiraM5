// Baut dist/thinkkira-designer.html und dist/thinkkira-map.html: je eine einzelne Datei, die ohne Internet funktioniert (JS eingebettet).
// Bootstrap/Font Awesome werden versucht vom CDN zu laden; ohne Internet bleibt der Designer bedienbar, nur schlichter.
// SPDX-License-Identifier: GPL-3.0-only
import { readFileSync, writeFileSync } from "node:fs";
function page(js, title, id) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body>
<main class="container-fluid py-4">
<h1 class="h4 mb-3">${title}</h1>
<div id="${id}"></div>
</main>
<script type="module">
${js}
</script>
</body>
</html>
`;
}
for (const [name, title, id] of [
  ["thinkkira-designer", "ThinkKira Designer", "tk-designer"],
  ["thinkkira-map", "ThinkKira Karte & Wegpunkte", "tk-map"],
]) {
  const js = readFileSync(new URL(`../dist/${name}.js`, import.meta.url), "utf8").replace(/<\/script/gi, "<\\/script");
  const html = page(js, title, id);
  writeFileSync(new URL(`../dist/${name}.html`, import.meta.url), html);
  console.log(`dist/${name}.html`, html.length, "Bytes");
}
