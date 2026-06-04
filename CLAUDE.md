# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Fork Identity

This is a personal fork (`JaseOnline/home-assistant-vscode-extension`) of `keesschollaart81/home-assistant-vscode`. Fork-specific additions live in:
- `src/themes/` — HA Neon Dark colour theme (embedded, replaces the standalone `ha-neon-dark` extension)
- `src/grammars/` — JS block/inline injection grammars for Button-Card `[[[...]]]` syntax
- `src/parts/` — Modular theme source components (hand-assembled into `src/themes/ha-neon-dark-color-theme.json`; no build script yet)
- `src/auth/` — Credential management via VS Code SecretStorage (token + HA URL)
- `src/status/` — Status bar showing HA connection state

## Build Commands

```bash
# Install deps (use --ignore-scripts on Node v24/Windows — avoids native module EINVAL on utf-8-validate/bufferutil)
npm install --ignore-scripts

# Full compile: language-service → schema generation → extension
npm run compile

# Schema generation only (force regeneration, no --quick flag)
npm run schema

# Watch mode for extension TypeScript only
npm run watch

# Lint
npm run lint

# Tests (compiles first)
npm test
```

The `compile` script runs three steps in order:
1. `tsc -p src/language-service/tsconfig.json` — compiles language-service to `src/language-service/dist/`
2. `ts-node src/language-service/src/schemas/generateSchemas.ts --quick` — generates JSON schemas into `src/language-service/dist/schemas/json/` (skipped if files already exist)
3. `tsc -p ./` — compiles extension and server to `out/`

**Important:** `generateSchemas.ts` must be run via `ts-node` (not `node dist/...`). It uses `__dirname` to resolve `.ts` source files; running the compiled JS from `dist/` breaks this because the `.ts` files are only in `src/`.

## Architecture

### Two-Process Model

The extension runs as two separate Node.js processes communicating over IPC:

- **Extension host** (`src/extension.ts` → `out/extension.js`): VS Code process. Manages auth (SecretStorage), status bar, commands, and spawns the language server.
- **Language server** (`src/server/server.ts` → `out/server/server.js`): Separate process. Handles all YAML intelligence — completions, validation, hover, go-to-definition. Uses `vscode-languageclient`/`vscode-languageserver`.

The extension host starts the language server via `LanguageClient`, passing credentials in `initializationOptions`. An `AuthMiddleware` intercepts LSP messages to inject the HA token and URL from SecretStorage.

### Language Service (`src/language-service/`)

Self-contained sub-package with its own `tsconfig.json` (`outDir: dist`, `rootDir: src`). Provides:

- **`haLanguageService.ts`** — Orchestrates completions, diagnostics, hover, definition. Wraps `yaml-language-server` and injects HA-specific completions.
- **`completionHelpers/`** — One file per completion type: entity IDs, services, areas, floors, labels, device IDs, secrets, UUIDs.
- **`haConfig/`** — Parses the HA config directory, resolves `!include` / `!include_dir_*` YAML tags.
- **`home-assistant/`** — WebSocket connection to HA (`haConnection.ts`, `socket.ts`) using `home-assistant-js-websocket`.
- **`schemas/`** — TypeScript type definitions compiled to JSON Schema at build time. `configuration.ts` is the root; `integrations/core/` has one `.ts` per integration; `lovelace/` covers dashboard schemas. `generateSchemas.ts` uses `typescript-json-schema` to emit `dist/schemas/json/*.json`, which are loaded at runtime by `schemaService.ts`.
- **`definition/`** — Go-to-definition providers for `!include` tags, script references, and secrets.

### Grammar / Syntax Highlighting

- `syntaxes/external/YAML.tmLanguage` — Base YAML grammar, scope `source.home-assistant`
- `syntaxes/home-assistant/jinja-*.tmLanguage` — Jinja injection grammars injected into `source.home-assistant`
- `src/grammars/js-block.tmLanguage.json` — Injects JS highlighting into Button-Card `[[[...]]]` blocks
- `src/grammars/js-inline.tmLanguage.json` — Inline variant

### Schema Pipeline

TypeScript interfaces in `src/language-service/src/schemas/` → `typescript-json-schema` (TJS) → JSON files in `src/language-service/dist/schemas/json/`. The mapping between schema keys, paths, TS types, and output files is `src/language-service/dist/schemas/mappings.json` (the dist copy is authoritative at runtime; the source copy is the build input).

## Known Validators / False Positives

The label validator flags `Reload`, `Lighting`, `Music` as unknown — these are valid HA labels. The area validator flags `ssid`, `pwd`, `qr` — these are valid area names in Jason's HA config. These are known false positives; do not suppress them by altering schema types.

## Pending Work (Fork Tracks)

- **Track 2** — Improve YAML grammar (`syntaxes/external/YAML.tmLanguage`) to emit distinct TextMate scopes for HA-specific patterns (entity ID domains like `light.`, `sensor.`; service call names). Enables richer syntax colour with the HA Neon Dark theme.
- **Track 3** — Evaluate `jaseonline/home-assistant-json-schema` repo (`C:\Dev\projects\personal\home-assistant-json-schema`) for automated schema generation to replace hand-written `.ts` files in `src/language-service/src/schemas/integrations/core/`. High effort; separate sub-project.
- **Optional** — Build script to assemble `src/parts/*.json` into `src/themes/ha-neon-dark-color-theme.json` (currently hand-maintained).
