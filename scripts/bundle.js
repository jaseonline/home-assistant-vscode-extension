#!/usr/bin/env node
// Bundles the VS Code extension host and language server using esbuild.
//
// Why: vscode-languageclient, vscode-languageserver, and other runtime deps
// are NOT available in the installed extension directory unless either bundled
// here or copied as node_modules. Bundling is cleaner — no node_modules needed
// at runtime.
//
// Entry points:
//   src/extension.ts    → out/extension.js   (extension host process)
//   src/server/server.ts → out/server/server.js (language server process)
//
// After bundling, the schema JSON files that schemaService.ts reads at runtime
// via __dirname are copied from src/language-service/dist/schemas/ into
// out/server/ so they sit next to the bundled server.js.
//
// Externals:
//   vscode           — provided by VS Code at runtime, never bundle
//   bufferutil       — native addon (optional ws optimisation), falls back to JS
//   utf-8-validate   — native addon (optional ws optimisation), falls back to JS

"use strict";

const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const isWatch = process.argv.includes("--watch");
const isProduction = process.argv.includes("--production");

// yaml-language-server@1.19.2 directly imports internal UMD subpaths from its
// nested vscode-json-languageservice@4.x, e.g.:
//   require("vscode-json-languageservice/lib/umd/services/jsonSchemaService")
// The UMD factory pattern — factory(require, exports) — aliases `require` through
// a function parameter, hiding require('jsonc-parser') from esbuild's static
// analysis. jsonc-parser never gets bundled, and the installed extension crashes.
// This plugin rewrites those hard-coded lib/umd/ subpaths to lib/esm/, which uses
// static `import` statements that esbuild can bundle correctly.
const yamlLsUmdToEsm = {
  name: "yaml-ls-umd-to-esm",
  setup(build) {
    build.onResolve(
      { filter: /^vscode-json-languageservice\/lib\/umd\// },
      async (args) => {
        const esmPath = args.path.replace("/lib/umd/", "/lib/esm/");
        return await build.resolve(esmPath, {
          resolveDir: args.resolveDir,
          kind: args.kind,
        });
      },
    );
  },
};

// yaml-language-server's yamlFormatter.js requires prettier at module top-level
// (not lazily), so marking prettier as external causes a MODULE_NOT_FOUND crash
// at server startup. We don't need YAML formatting in the HA extension, so stub
// all prettier imports with empty objects — the formatter will silently be a no-op.
const prettierStub = {
  name: "prettier-stub",
  setup(build) {
    build.onResolve({ filter: /^prettier/ }, (args) => ({
      namespace: "prettier-stub",
      path: args.path,
    }));
    build.onLoad({ filter: /.*/, namespace: "prettier-stub" }, () => ({
      contents: "module.exports = {};",
      loader: "js",
    }));
  },
};

const shared = {
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  plugins: [yamlLsUmdToEsm, prettierStub],
  // Prefer ESM ('module') over UMD ('main') for all packages. Without this,
  // packages like jsonc-parser resolve to lib/umd/main.js, which uses the same
  // UMD factory pattern and hides its own relative sub-module requires from
  // esbuild's static analysis (e.g. require2('./impl/format')).
  mainFields: ["module", "main"],
  external: [
    // Provided by VS Code at runtime
    "vscode",
    // Native addons — optional ws optimisations, ws falls back to pure JS
    "bufferutil",
    "utf-8-validate",
  ],
  sourcemap: !isProduction,
  minify: isProduction,
  absWorkingDir: root,
};

async function copySchemas() {
  const schemasSrc = path.join(
    root,
    "src",
    "language-service",
    "dist",
    "schemas",
  );
  const schemasDest = path.join(root, "out", "server");

  const mappingsSrc = path.join(schemasSrc, "mappings.json");
  if (!fs.existsSync(mappingsSrc)) {
    console.warn(
      "⚠  src/language-service/dist/schemas/mappings.json not found — " +
        "run tsc + generateSchemas before bundle",
    );
    return;
  }

  fs.mkdirSync(path.join(schemasDest, "json"), { recursive: true });
  fs.copyFileSync(mappingsSrc, path.join(schemasDest, "mappings.json"));

  const jsonSrc = path.join(schemasSrc, "json");
  for (const file of fs.readdirSync(jsonSrc)) {
    fs.copyFileSync(
      path.join(jsonSrc, file),
      path.join(schemasDest, "json", file),
    );
  }
  console.log("  ✓ schema JSON → out/server/");
}

async function build() {
  if (isWatch) {
    // Watch mode: esbuild rebuilds automatically on source changes.
    // Schemas are not re-copied on watch (run compile for a full refresh).
    const ctxExtension = await esbuild.context({
      ...shared,
      entryPoints: ["src/extension.ts"],
      outfile: "out/extension.js",
    });
    const ctxServer = await esbuild.context({
      ...shared,
      entryPoints: ["src/server/server.ts"],
      outfile: "out/server/server.js",
    });
    await Promise.all([ctxExtension.watch(), ctxServer.watch()]);
    console.log("  watching for changes (Ctrl+C to stop)…");
    return; // keep process alive
  }

  await esbuild.build({
    ...shared,
    entryPoints: ["src/extension.ts"],
    outfile: "out/extension.js",
  });
  console.log("  ✓ out/extension.js");

  await esbuild.build({
    ...shared,
    entryPoints: ["src/server/server.ts"],
    outfile: "out/server/server.js",
  });
  console.log("  ✓ out/server/server.js");

  await copySchemas();
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
