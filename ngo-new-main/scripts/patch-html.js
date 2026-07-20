/**
 * RG Care Foundation — HTML patcher
 * Rewrites all public/*.html files to:
 *   1. Remove @babel/standalone script tag
 *   2. Replace type="text/babel" src="x.jsx" with src="dist/x.js"
 *   3. Add performance resource hints (preconnect, dns-prefetch)
 */

const fs   = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const htmlFiles = fs.readdirSync(PUBLIC).filter(f => f.endsWith('.html'));

// Preconnect hints to inject right after <head>
const PERF_HINTS = `
  <!-- Performance: resource hints -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />`;

const BABEL_SCRIPT_RE = /\s*<script[^>]*cdn\.jsdelivr\.net\/npm\/@babel\/standalone[^>]*><\/script>/g;
const BABEL_ATTR_RE   = / type="text\/babel"/g;
const JSX_SRC_RE      = / src="([^"]+\.jsx)"/g;

let patched = 0;

for (const file of htmlFiles) {
  const fp = path.join(PUBLIC, file);
  let html = fs.readFileSync(fp, 'utf8');
  const original = html;

  // 1. Remove Babel standalone
  html = html.replace(BABEL_SCRIPT_RE, '');

  // 2. Remove type="text/babel" attribute
  html = html.replace(BABEL_ATTR_RE, '');

  // 3. Rewrite .jsx src paths → dist/.js
  html = html.replace(JSX_SRC_RE, (_, src) => {
    const jsName = path.basename(src, '.jsx') + '.js';
    return ` src="dist/${jsName}"`;
  });

  // 4. Inject preconnect hints after <head> (only once, only if not already there)
  if (!html.includes('preconnect" href="https://cdn.jsdelivr.net"')) {
    html = html.replace('<head>', '<head>' + PERF_HINTS);
  }

  if (html !== original) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`  ✓  ${file}`);
    patched++;
  } else {
    console.log(`  –  ${file}  (no changes)`);
  }
}

console.log(`\nPatched ${patched} / ${htmlFiles.length} HTML files.\n`);
