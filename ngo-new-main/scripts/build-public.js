/**
 * RG Care Foundation — JSX pre-compiler
 * Transpiles all public/*.jsx files to public/dist/*.js
 * Run: node scripts/build-public.js
 * Then deploy the public/ folder including public/dist/
 */

const fs   = require('fs');
const path = require('path');
const babel = require('@babel/core');

const PUBLIC = path.join(__dirname, '..', 'public');
const DIST   = path.join(PUBLIC, 'dist');

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

const files = fs.readdirSync(PUBLIC).filter(f => f.endsWith('.jsx'));

let ok = 0, fail = 0;
const start = Date.now();

console.log(`\nCompiling ${files.length} JSX files → public/dist/\n`);

for (const file of files) {
  const src = fs.readFileSync(path.join(PUBLIC, file), 'utf8');
  try {
    const result = babel.transformSync(src, {
      filename: file,
      presets: [['@babel/preset-react', { runtime: 'classic' }]],
      sourceType: 'script',   // no import/export — everything is global scope
      compact: true,
      comments: false,
    });
    const out = file.replace('.jsx', '.js');
    fs.writeFileSync(path.join(DIST, out), result.code, 'utf8');
    const kb = (result.code.length / 1024).toFixed(1);
    console.log(`  ✓  ${file.padEnd(35)} → dist/${out}  (${kb} KB)`);
    ok++;
  } catch (e) {
    console.error(`  ✗  ${file}: ${e.message}`);
    fail++;
  }
}

const ms = Date.now() - start;
console.log(`\n${ok} compiled, ${fail} failed — ${ms}ms\n`);
if (fail) process.exit(1);
