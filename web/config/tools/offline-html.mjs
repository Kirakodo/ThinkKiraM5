// Baut dist/thinkkira-designer.html: eine einzelne Datei, die ohne Internet funktioniert (JS eingebettet).
// Bootstrap/Font Awesome werden versucht vom CDN zu laden; ohne Internet bleibt der Designer bedienbar, nur schlichter.
// SPDX-License-Identifier: GPL-3.0-only
import { readFileSync, writeFileSync } from "node:fs";
const js = readFileSync(new URL("../dist/thinkkira-designer.js", import.meta.url), "utf8").replace(/<\/script/gi, "<\\/script");
const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ThinkKira Designer</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body>
<main class="container py-4">
<h1 class="h4 mb-3">ThinkKira Designer</h1>
<div id="tk-designer"></div>
</main>
<script type="module">
${js}
</script>
</body>
</html>
`;
writeFileSync(new URL("../dist/thinkkira-designer.html", import.meta.url), html);
console.log("dist/thinkkira-designer.html", html.length, "Bytes");
