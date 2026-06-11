#!/usr/bin/env node
// convert-to-tokens.js — one-off migration: replace raw hex values in
// src/parts/*.json with $token references wherever the base colour exists
// in palette.json. Hex colours not in the palette are left untouched.
// Usage: node scripts/convert-to-tokens.js

"use strict";

const fs = require("fs");
const path = require("path");

const partsDir = path.join(__dirname, "..", "src", "parts");
const FILES = ["workbench.json", "tokens-ha.json", "tokens-general.json", "semantic.json"];

const paletteRaw = JSON.parse(fs.readFileSync(path.join(partsDir, "palette.json"), "utf8"));
const hexToToken = new Map(); // "#aabbcc" (lower) -> token name
for (const [key, value] of Object.entries(paletteRaw)) {
    if (key.startsWith("//")) continue;
    hexToToken.set(value.toLowerCase(), key);
}

let converted = 0;
let skipped = 0;

function convert(node) {
    if (typeof node === "string") {
        const m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(node);
        if (!m) return node;
        const base = "#" + m[1].toLowerCase();
        const token = hexToToken.get(base);
        if (!token) {
            skipped++;
            return node;
        }
        converted++;
        return "$" + token + (m[2] ? "@" + m[2].toLowerCase() : "");
    }
    if (Array.isArray(node)) return node.map(convert);
    if (node && typeof node === "object") {
        const out = {};
        for (const [k, v] of Object.entries(node)) out[k] = convert(v);
        return out;
    }
    return node;
}

for (const file of FILES) {
    const fp = path.join(partsDir, file);
    const data = JSON.parse(fs.readFileSync(fp, "utf8"));
    fs.writeFileSync(fp, JSON.stringify(convert(data), null, 4) + "\n", "utf8");
    console.log(`converted: ${file}`);
}

console.log(`\n${converted} hex values -> tokens, ${skipped} left as raw hex (not in palette)`);
