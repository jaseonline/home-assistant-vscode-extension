#!/usr/bin/env node
// Assembles src/themes/ha-neon-dark-color-theme.json from src/parts/
//
// Parts files (edit these, not the theme directly):
//   src/parts/meta.json          — theme name, type, semanticHighlighting flag
//   src/parts/workbench.json     — VS Code UI / workbench colors ("colors" key)
//   src/parts/tokens-ha.json     — HA-specific TextMate token rules (18 rules)
//   src/parts/tokens-general.json — general language TextMate token rules, incl. Jinja2 (35 rules)
//   src/parts/semantic.json      — semantic token colors
//
// Output (do not edit directly):
//   src/themes/ha-neon-dark-color-theme.json

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const partsDir = path.join(root, "src", "parts");
const outFile = path.join(root, "src", "themes", "ha-neon-dark-color-theme.json");

function readPart(name) {
    const file = path.join(partsDir, name);
    try {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (err) {
        console.error(`Error reading ${file}: ${err.message}`);
        process.exit(1);
    }
}

const meta = readPart("meta.json");
const workbench = readPart("workbench.json");
const tokensHa = readPart("tokens-ha.json");
const tokensGeneral = readPart("tokens-general.json");
const semantic = readPart("semantic.json");

if (!Array.isArray(tokensHa)) {
    console.error("tokens-ha.json must be a JSON array");
    process.exit(1);
}
if (!Array.isArray(tokensGeneral)) {
    console.error("tokens-general.json must be a JSON array");
    process.exit(1);
}

const theme = {
    $schema: "vscode://schemas/color-theme",
    ...meta,
    colors: workbench,
    tokenColors: [...tokensHa, ...tokensGeneral],
    semanticTokenColors: semantic,
};

const output = JSON.stringify(theme, null, 4) + "\n";
fs.writeFileSync(outFile, output, "utf8");

const rel = path.relative(root, outFile);
const tokenCount = theme.tokenColors.length;
console.log(
    `✓ Theme assembled → ${rel}  (${tokenCount} token rules: ${tokensHa.length} HA, ${tokensGeneral.length} general)`
);
