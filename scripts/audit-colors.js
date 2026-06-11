#!/usr/bin/env node
// audit-colors.js — inventory every hex colour across src/parts/*.json.
// Usage: node scripts/audit-colors.js
// Prints a summary to stdout and writes the full report to color-audit.md (repo root).

const fs = require('fs');
const path = require('path');

const PARTS_DIR = path.join(__dirname, '..', 'src', 'parts');
const PART_FILES = ['meta.json', 'workbench.json', 'tokens-ha.json', 'tokens-general.json', 'semantic.json'];
const HEX_RE = /#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g;
const CLUSTER_THRESHOLD = 60; // Euclidean RGB distance

// ---- collection ----------------------------------------------------------
const occurrences = []; // { hex, base, alpha, file, jsonPath }

function walk(node, jsonPath, file) {
  if (typeof node === 'string') {
    let m;
    HEX_RE.lastIndex = 0;
    while ((m = HEX_RE.exec(node)) !== null) {
      const { base, alpha } = normalize(m[0]);
      occurrences.push({ hex: m[0], base, alpha, file, jsonPath });
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${jsonPath}[${i}]`, file));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      walk(v, jsonPath ? `${jsonPath}.${k}` : k, file);
    }
  }
}

// ---- helpers -------------------------------------------------------------
function normalize(hex) {
  let h = hex.slice(1).toLowerCase();
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  const base = '#' + h.slice(0, 6);
  const alpha = h.length === 8 ? h.slice(6) : null;
  return { base, alpha };
}

function rgb(base) {
  return [
    parseInt(base.slice(1, 3), 16),
    parseInt(base.slice(3, 5), 16),
    parseInt(base.slice(5, 7), 16),
  ];
}

function dist(a, b) {
  const [r1, g1, b1] = rgb(a);
  const [r2, g2, b2] = rgb(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function hue(base) {
  const [r, g, b] = rgb(base).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return -1; // greyscale
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return Math.round(((h * 60) + 360) % 360);
}

// ---- load parts ----------------------------------------------------------
for (const file of PART_FILES) {
  const fp = path.join(PARTS_DIR, file);
  if (!fs.existsSync(fp)) {
    console.warn(`(skipping missing part: ${file})`);
    continue;
  }
  walk(JSON.parse(fs.readFileSync(fp, 'utf8')), '', file);
}

// ---- aggregate by base colour --------------------------------------------
const byBase = new Map(); // base -> { count, alphas:Map, files:Map, paths:[] }
for (const o of occurrences) {
  if (!byBase.has(o.base)) {
    byBase.set(o.base, { count: 0, alphas: new Map(), files: new Map(), paths: [] });
  }
  const e = byBase.get(o.base);
  e.count++;
  const a = o.alpha || 'ff (opaque)';
  e.alphas.set(a, (e.alphas.get(a) || 0) + 1);
  e.files.set(o.file, (e.files.get(o.file) || 0) + 1);
  if (e.paths.length < 4) e.paths.push(`${o.file}: ${o.jsonPath}`);
}

// ---- cluster near-duplicates (greedy, sorted by usage) --------------------
const bases = [...byBase.entries()].sort((a, b) => b[1].count - a[1].count);
const clusters = []; // { canonical, members: [base] }
for (const [base] of bases) {
  const home = clusters.find((c) => dist(c.canonical, base) <= CLUSTER_THRESHOLD);
  if (home) home.members.push(base);
  else clusters.push({ canonical: base, members: [base] });
}

// ---- report ---------------------------------------------------------------
const lines = [];
lines.push('# Colour Audit — src/parts/');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push(`| Metric | Count |`);
lines.push(`|---|---|`);
lines.push(`| Colour literals (total occurrences) | ${occurrences.length} |`);
lines.push(`| Unique raw values (incl. alpha variants) | ${new Set(occurrences.map((o) => o.hex.toLowerCase())).size} |`);
lines.push(`| Unique base colours (alpha stripped) | ${byBase.size} |`);
lines.push(`| Clusters (dist <= ${CLUSTER_THRESHOLD}) | ${clusters.length} |`);
lines.push('');
const perFile = new Map();
for (const o of occurrences) perFile.set(o.file, (perFile.get(o.file) || 0) + 1);
lines.push('Per file: ' + [...perFile.entries()].map(([f, n]) => `${f} (${n})`).join(', '));
lines.push('');

lines.push('## Base colours by usage');
lines.push('');
lines.push('| Base | Hue | Uses | Alpha variants | Files | Example locations |');
lines.push('|---|---|---|---|---|---|');
for (const [base, e] of bases) {
  const h = hue(base);
  const alphas = [...e.alphas.entries()].map(([a, n]) => `${a}×${n}`).join(', ');
  const files = [...e.files.entries()].map(([f, n]) => `${f.replace('.json', '')}×${n}`).join(', ');
  const ex = e.paths.slice(0, 2).join('<br>');
  lines.push(`| \`${base}\` | ${h < 0 ? 'grey' : h + '°'} | ${e.count} | ${alphas} | ${files} | ${ex} |`);
}
lines.push('');

lines.push('## Near-duplicate clusters (candidates to collapse)');
lines.push('');
let multi = 0;
for (const c of clusters) {
  if (c.members.length < 2) continue;
  multi++;
  const detail = c.members
    .map((m) => `\`${m}\` (${byBase.get(m).count} uses, d=${Math.round(dist(c.canonical, m))})`)
    .join(', ');
  lines.push(`- **${c.canonical}** cluster: ${detail}`);
}
if (multi === 0) lines.push('(none within threshold)');
lines.push('');

lines.push('## Singletons (used exactly once — review for typos/strays)');
lines.push('');
const singles = bases.filter(([, e]) => e.count === 1);
for (const [base, e] of singles) lines.push(`- \`${base}\` — ${e.paths[0]}`);
if (singles.length === 0) lines.push('(none)');
lines.push('');

const outPath = path.join(__dirname, '..', 'color-audit.md');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

// ---- stdout summary --------------------------------------------------------
console.log(`Occurrences:        ${occurrences.length}`);
console.log(`Unique raw values:  ${new Set(occurrences.map((o) => o.hex.toLowerCase())).size}`);
console.log(`Unique base colours:${byBase.size}`);
console.log(`Clusters:           ${clusters.length} (${multi} with 2+ members)`);
console.log(`Singletons:         ${singles.length}`);
console.log(`Report written to:  ${outPath}`);
