# Track 4 — Lovelace Dashboard Editing

Edit storage-mode Lovelace dashboards directly from VS Code, round-tripping via the HA WebSocket API. Ported concept from `myakove/homeassistant-lsp` (`commands.ts`, `ha-client.ts`) and the `homeassistant-nvim` dashboard-editor UX; reimplemented against this fork's existing connection layer, not vendored.

## WebSocket API surface

Three message types, all available on the existing `home-assistant-js-websocket` connection in `haConnection.ts` via `sendMessagePromise` (same pattern as the area/floor/device/label registry fetches):

| Message | Purpose |
|---|---|
| `{ type: "lovelace/dashboards/list" }` | List registered dashboards (id, url_path, title, mode) |
| `{ type: "lovelace/config", url_path }` | Fetch dashboard config (`url_path: null` = default "Overview" dashboard) |
| `{ type: "lovelace/config/save", url_path, config }` | Write dashboard config back |

Eligibility filter (from myakove's implementation, verified sensible):
- `mode === "storage"` only — YAML-mode dashboards must be edited in config files
- Exclude configs with a `strategy` key (auto-generated/iframe dashboards)
- Include configs with a `views` array (user-managed)
- Add a synthetic entry for the default dashboard (`url_path: null`) — it is **not** returned by `lovelace/dashboards/list`

## Architecture — mirrors existing callService/renderTemplate flow

### 1. `haConnection.ts` (language-service)

Three new public methods using `sendMessagePromise`:

```ts
getDashboards(): Promise<HassDashboard[]>          // lovelace/dashboards/list
getDashboardConfig(urlPath: string | null): Promise<any>   // lovelace/config
saveDashboardConfig(urlPath: string | null, config: any): Promise<void>  // lovelace/config/save
```

Plus a `HassDashboard` type (id, url_path, title, mode, icon, show_in_sidebar).

### 2. `server.ts` (language server)

Three `connection.onRequest` handlers. Unlike `checkConfig`/`getErrorLog` (which respond via fire-and-forget notifications), these should **return results directly from the request handler** — the extension needs the data synchronously to drive UI, and `onRequest` supports return values. No new notifications needed.

```ts
connection.onRequest("getDashboards", ...)
connection.onRequest("getDashboardConfig", (args: { urlPath: string | null }) => ...)
connection.onRequest("saveDashboardConfig", (args: { urlPath: string | null; config: any }) => ...)
```

Errors (not connected, save rejected) returned as `{ error: string }` for the extension to surface.

### 3. Extension host — new `src/dashboards/` module

**FileSystemProvider** with a custom scheme, e.g. `ha-dashboard:`. This is the idiomatic VS Code mechanism: opening `ha-dashboard:/lovelace-home.json` reads via `getDashboardConfig`; Ctrl+S writes via `saveDashboardConfig`. No temp files, no onWillSave hooks, dirty-state and save UX come free.

- `readFile` → `client.sendRequest("getDashboardConfig", …)` → pretty-printed JSON
- `writeFile` → parse JSON (reject invalid JSON with a clear error before any network call) → `client.sendRequest("saveDashboardConfig", …)`
- `stat`/`readDirectory` minimal implementations

**Command** `home-assistant-vscode.editDashboard` ("Edit Lovelace Dashboard"):
1. `sendRequest("getDashboards")` → filter per eligibility rules → prepend default dashboard entry
2. QuickPick (title + url_path, icon if present)
3. `vscode.workspace.openTextDocument(Uri.parse("ha-dashboard:/<url_path>.json"))` and show

Register command in `package.json` `contributes.commands` (category "Home Assistant") and gate in `menus.commandPalette` like existing commands.

## Safety

- **Last-write-wins, no server-side conflict detection** — the WS API has no etag/revision. Mitigation: before `saveDashboardConfig`, re-fetch current config and compare against the config as-fetched at open time (keep snapshot in the provider). On mismatch, modal warning: "Dashboard changed in HA since you opened it — overwrite / cancel."
- **Local backup before overwrite**: write the pre-save fetched config to `~/.ha-dashboard-backups/<url_path>-<timestamp>.json` (configurable, default on). Jason's HA has no git rollback — this is the only undo.
- Save is an explicit user action (Ctrl+S); no auto-save push.

## Phases

### Phase 1 — Core (the day's-work slice)
- `haConnection` methods + `HassDashboard` type
- `server.ts` request handlers
- FileSystemProvider + editDashboard command + QuickPick
- JSON editing only
- Pre-save backup file

Estimate: ~1 day.

### Phase 2 — Conflict guard + polish
- Open-time snapshot + pre-save diff warning
- Status bar / notification feedback on successful save
- Mock-connection tests in `src/test/suite/` (dashboard list filtering, provider read/write, invalid-JSON rejection)

Estimate: ~half a day.

### Phase 3 (optional) — YAML editing mode
Present the config as YAML (`js-yaml` round-trip; data is JSON-native so fidelity is safe, no comments to lose). Payoff: dashboard configs get the fork's own stack — Lovelace schemas, card-mod CSS grammar, Button-Card JS injection, HA Neon Dark theme — making this the best Lovelace editing surface available anywhere. Set document language to `home-assistant`. Risk: YAML→JSON conversion errors must block save with a precise message.

Estimate: ~half a day, after Phase 1/2 proven.

## Non-goals
- Editing YAML-mode dashboards (already file-based)
- Live preview / rendering
- Dashboard create/delete (UI does this fine; `lovelace/dashboards/create` exists if ever wanted)
- Entity dashboard / state-viewer UI from homeassistant-nvim (separate idea, not this track)

## Open questions
- Command naming: `editDashboard` vs `openDashboard` — match "Open Home Assistant in Browser" phrasing?
- Should the provider expose all dashboards under `readDirectory` so the Explorer can mount `ha-dashboard:/` as a workspace folder? Nice-to-have, not Phase 1.
