# Colour Audit — src/parts/

Generated: 2026-06-09T21:50:12.545Z

## Summary

| Metric | Count |
|---|---|
| Colour literals (total occurrences) | 333 |
| Unique raw values (incl. alpha variants) | 152 |
| Unique base colours (alpha stripped) | 124 |
| Clusters (dist <= 60) | 36 |

Per file: workbench.json (247), tokens-ha.json (28), tokens-general.json (36), semantic.json (22)

## Base colours by usage

| Base | Hue | Uses | Alpha variants | Files | Example locations |
|---|---|---|---|---|---|
| `#ffffff` | grey | 39 | 0a×1, 0b×1, ff (opaque)×28, 66×2, 00×1, 1f×1, 25×1, 1a×1, cc×1, 80×1, 07×1 | workbench×39 | workbench.json: editor.lineHighlightBackground<br>workbench.json: editor.rangeHighlightBackground |
| `#000000` | grey | 29 | ff (opaque)×11, 00×14, 85×1, 12×1, 5c×1, 50×1 | workbench×29 | workbench.json: editorCursor.background<br>workbench.json: editor.inactiveSelectionBackground |
| `#fc49ab` | 327° | 23 | ff (opaque)×18, 68×1, a3×1, bb×1, be×1, 1a×1 | workbench×14, semantic×9 | workbench.json: focusBorder<br>workbench.json: list.inactiveSelectionBackground |
| `#00b4ff` | 198° | 11 | ff (opaque)×11 | workbench×3, tokens-ha×2, tokens-general×5, semantic×1 | workbench.json: editorBracketHighlight.foreground1<br>workbench.json: editorInfo.foreground |
| `#c792ea` | 276° | 10 | ff (opaque)×10 | workbench×2, tokens-ha×3, tokens-general×4, semantic×1 | workbench.json: editorBracketHighlight.foreground3<br>workbench.json: terminal.ansiMagenta |
| `#ffe600` | 54° | 10 | ff (opaque)×10 | workbench×3, tokens-general×5, semantic×2 | workbench.json: editorBracketHighlight.foreground4<br>workbench.json: editorWarning.foreground |
| `#cccccc` | grey | 10 | ff (opaque)×7, b3×1, 33×1, 99×1 | workbench×10 | workbench.json: editorWidget.foreground<br>workbench.json: editorHoverWidget.foreground |
| `#bbadff` | 250° | 9 | ff (opaque)×9 | workbench×1, tokens-ha×2, tokens-general×3, semantic×3 | workbench.json: editorBracketHighlight.foreground5<br>tokens-ha.json: [15].settings.foreground |
| `#ff0080` | 330° | 8 | ff (opaque)×8 | workbench×1, tokens-ha×2, tokens-general×4, semantic×1 | workbench.json: editorBracketHighlight.foreground2<br>tokens-ha.json: [5].settings.foreground |
| `#00ffe7` | 174° | 8 | ff (opaque)×8 | workbench×2, tokens-ha×2, tokens-general×2, semantic×2 | workbench.json: editorBracketHighlight.foreground6<br>workbench.json: terminal.ansiCyan |
| `#e8e8f0` | 240° | 7 | ff (opaque)×7 | tokens-ha×2, tokens-general×4, semantic×1 | tokens-ha.json: [3].settings.foreground<br>tokens-ha.json: [25].settings.foreground |
| `#00ff80` | 150° | 6 | ff (opaque)×6 | workbench×1, tokens-ha×1, tokens-general×3, semantic×1 | workbench.json: terminal.ansiGreen<br>tokens-ha.json: [9].settings.foreground |
| `#ff9500` | 35° | 6 | ff (opaque)×6 | tokens-ha×1, tokens-general×5 | tokens-ha.json: [4].settings.foreground<br>tokens-general.json: [5].settings.foreground |
| `#0f0f0f` | grey | 5 | ff (opaque)×5 | workbench×5 | workbench.json: editor.background<br>workbench.json: editorGroup.emptyBackground |
| `#ff4d73` | 347° | 4 | ff (opaque)×4 | workbench×3, tokens-ha×1 | workbench.json: editorError.foreground<br>workbench.json: editorSuggestWidget.highlightForeground |
| `#252526` | 240° | 4 | ff (opaque)×4 | workbench×4 | workbench.json: editorSuggestWidget.background<br>workbench.json: editorHoverWidget.background |
| `#474747` | grey | 4 | ff (opaque)×4 | workbench×4 | workbench.json: debugToolBar.border<br>workbench.json: debugExceptionWidget.border |
| `#ff0000` | 0° | 3 | 33×1, ff (opaque)×2 | workbench×1, tokens-ha×2 | workbench.json: diffEditor.removedTextBackground<br>tokens-ha.json: [7].settings.foreground |
| `#f48771` | 10° | 3 | ff (opaque)×3 | workbench×3 | workbench.json: editorMarkerNavigationError.background<br>workbench.json: notificationsErrorIcon.foreground |
| `#cca700` | 49° | 3 | ff (opaque)×3 | workbench×3 | workbench.json: editorMarkerNavigationWarning.background<br>workbench.json: notificationsWarningIcon.foreground |
| `#808080` | grey | 3 | 59×3 | workbench×3 | workbench.json: panel.border<br>workbench.json: panelSection.border |
| `#e7e7e7` | grey | 3 | ff (opaque)×2, 99×1 | workbench×3 | workbench.json: panelTitle.activeBorder<br>workbench.json: panelTitle.activeForeground |
| `#929292` | grey | 3 | ff (opaque)×3 | tokens-ha×1, tokens-general×1, semantic×1 | tokens-ha.json: [14].settings.foreground<br>tokens-general.json: [0].settings.foreground |
| `#ea5c00` | 24° | 2 | 55×1, 4d×1 | workbench×2 | workbench.json: editor.findMatchHighlightBackground<br>workbench.json: peekViewResult.matchHighlightBackground |
| `#3a3d41` | 214° | 2 | 66×1, ff (opaque)×1 | workbench×2 | workbench.json: editor.findRangeHighlightBackground<br>workbench.json: button.secondaryBackground |
| `#264f78` | 210° | 2 | 40×1, 4d×1 | workbench×2 | workbench.json: editor.hoverHighlightBackground<br>workbench.json: editor.foldBackground |
| `#888888` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorBracketMatch.border<br>workbench.json: input.placeholderForeground |
| `#4490bf` | 203° | 2 | 00×2 | workbench×2 | workbench.json: editorInfo.background<br>workbench.json: editorInfo.border |
| `#1e1e1e` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGutter.background<br>workbench.json: peekViewTitle.background |
| `#0c7d9d` | 193° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGutter.modifiedBackground<br>workbench.json: minimapGutter.modifiedBackground |
| `#587c0c` | 79° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGutter.addedBackground<br>workbench.json: minimapGutter.addedBackground |
| `#94151b` | 357° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGutter.deletedBackground<br>workbench.json: minimapGutter.deletedBackground |
| `#c5c5c5` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGutter.foldingControlForeground<br>workbench.json: editorGutter.commentRangeForeground |
| `#444444` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorGroup.border<br>workbench.json: diffEditor.border |
| `#454545` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: editorSuggestWidget.border<br>workbench.json: editorHoverWidget.border |
| `#bbbbbb` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: peekViewResult.lineForeground<br>workbench.json: menu.separatorBackground |
| `#383b3d` | 204° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: sideBar.dropBackground<br>workbench.json: list.dropBackground |
| `#e0e0e0` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: breadcrumb.focusForeground<br>workbench.json: breadcrumb.activeSelectionForeground |
| `#333333` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: debugToolBar.background<br>workbench.json: debugExceptionWidget.background |
| `#303031` | 240° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: notifications.border<br>workbench.json: notificationCenterHeader.background |
| `#c74e39` | 9° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: gitDecoration.deletedResourceForeground<br>workbench.json: gitDecoration.stageDeletedResourceForeground |
| `#e2c08d` | 36° | 2 | ff (opaque)×2 | workbench×2 | workbench.json: gitDecoration.modifiedResourceForeground<br>workbench.json: gitDecoration.stageModifiedResourceForeground |
| `#e5e5e5` | grey | 2 | ff (opaque)×2 | workbench×2 | workbench.json: terminal.ansiBrightWhite<br>workbench.json: terminal.ansiWhite |
| `#00ff51` | 139° | 2 | ff (opaque)×2 | tokens-ha×2 | tokens-ha.json: [6].settings.foreground<br>tokens-ha.json: [27].settings.foreground |
| `#cfd8dc` | 198° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.foreground |
| `#858585` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorLineNumber.foreground |
| `#c6c6c6` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorLineNumber.activeForeground |
| `#aeafad` | 90° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorCursor.foreground |
| `#3e4041` | 200° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.selectionBackground |
| `#add6ff` | 210° | 1 | 26×1 | workbench×1 | workbench.json: editor.selectionHighlightBackground |
| `#495f77` | 211° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.selectionHighlightBorder |
| `#282828` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.lineHighlightBorder |
| `#e3e4e2` | 90° | 1 | 29×1 | workbench×1 | workbench.json: editorWhitespace.foreground |
| `#515c6a` | 214° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.findMatchBackground |
| `#74879f` | 213° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editor.findMatchBorder |
| `#004972` | 202° | 1 | b8×1 | workbench×1 | workbench.json: editor.wordHighlightStrongBackground |
| `#575757` | grey | 1 | b8×1 | workbench×1 | workbench.json: editor.wordHighlightBackground |
| `#4e94ce` | 207° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorLink.activeForeground |
| `#404040` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorIndentGuide.background1 |
| `#707070` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorIndentGuide.activeBackground1 |
| `#5a5a5a` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorRuler.foreground |
| `#006400` | 120° | 1 | 1a×1 | workbench×1 | workbench.json: editorBracketMatch.background |
| `#252525` | grey | 1 | 00×1 | workbench×1 | workbench.json: editorOverviewRuler.background |
| `#7f7f7f` | grey | 1 | 4d×1 | workbench×1 | workbench.json: editorOverviewRuler.border |
| `#b73a34` | 3° | 1 | 00×1 | workbench×1 | workbench.json: editorError.background |
| `#a99040` | 46° | 1 | 00×1 | workbench×1 | workbench.json: editorWarning.background |
| `#999999` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorCodeLens.foreground |
| `#9bb955` | 78° | 1 | 33×1 | workbench×1 | workbench.json: diffEditor.insertedTextBackground |
| `#322d2d` | 0° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorWidget.background |
| `#5f5f5f` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorWidget.resizeBorder |
| `#4f3232` | 0° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorSuggestWidget.selectedBackground |
| `#2d2d30` | 240° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorMarkerNavigation.background |
| `#75beff` | 208° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: editorMarkerNavigationInfo.background |
| `#381a1a` | 0° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: peekViewEditor.background |
| `#001f33` | 204° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: peekViewEditorGutter.background |
| `#08b5ea` | 194° | 1 | 99×1 | workbench×1 | workbench.json: peekViewEditor.matchHighlightBackground |
| `#00ffdb` | 172° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: peekViewEditor.matchHighlightBorder |
| `#3399ff` | 210° | 1 | 33×1 | workbench×1 | workbench.json: peekViewResult.selectionBackground |
| `#646464` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: selection.background |
| `#ee0839` | 347° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: activityBarBadge.background |
| `#c7c7c7` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: sideBar.foreground |
| `#a7a7a7` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: sideBarSectionHeader.foreground |
| `#626262` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: sideBarTitle.foreground |
| `#383d3f` | 197° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: list.hoverBackground |
| `#dbb6b6` | 0° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: list.hoverForeground |
| `#094771` | 204° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: list.activeSelectionBackground |
| `#062f4a` | 204° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: list.focusBackground |
| `#585858` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: tree.indentGuidesStroke |
| `#653723` | 18° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: listFilterWidget.background |
| `#ea210e` | 5° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: listFilterWidget.noMatchesOutline |
| `#262626` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: statusBar.background |
| `#cc6633` | 20° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: statusBar.debuggingBackground |
| `#212121` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: statusBar.noFolderBackground |
| `#7d7d7d` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: titleBar.activeForeground |
| `#191919` | grey | 1 | 99×1 | workbench×1 | workbench.json: titleBar.inactiveBackground |
| `#64ff00` | 96° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: menubar.selectionBorder |
| `#2a2a2a` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: menu.background |
| `#86011d` | 347° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: button.hoverBackground |
| `#45494e` | 213° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: button.secondaryHoverBackground |
| `#0584d9` | 204° | 1 | 00×1 | workbench×1 | workbench.json: inputOption.activeBorder |
| `#4d4d4d` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: badge.background |
| `#581725` | 347° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: tab.activeBackground |
| `#2c2c2c` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: tab.inactiveBackground |
| `#3f3f46` | 240° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: pickerGroup.border |
| `#81b88b` | 131° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: gitDecoration.addedResourceForeground |
| `#6c6cc4` | 240° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: gitDecoration.conflictingResourceForeground |
| `#8c8c8c` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: gitDecoration.ignoredResourceForeground |
| `#8db9e2` | 209° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: gitDecoration.submoduleResourceForeground |
| `#73c991` | 141° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: gitDecoration.untrackedResourceForeground |
| `#3f3f3f` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBlack |
| `#666666` | grey | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightBlack |
| `#3b8eea` | 212° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightBlue |
| `#29b8db` | 192° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightCyan |
| `#23d18b` | 156° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightGreen |
| `#d670d6` | 300° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightMagenta |
| `#f14c4c` | 0° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightRed |
| `#f5f543` | 60° | 1 | ff (opaque)×1 | workbench×1 | workbench.json: terminal.ansiBrightYellow |
| `#ffff00` | 60° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [1].settings.foreground |
| `#ff00ff` | 300° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [2].settings.foreground |
| `#5fe8ff` | 189° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [10].settings.foreground |
| `#fafafa` | grey | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [12].settings.foreground |
| `#881a94` | 294° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [16].settings.foreground |
| `#ff7300` | 27° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [17].settings.foreground |
| `#ffe6ff` | 300° | 1 | ff (opaque)×1 | tokens-ha×1 | tokens-ha.json: [22].settings.foreground |

## Near-duplicate clusters (candidates to collapse)

- **#ffffff** cluster: `#ffffff` (39 uses, d=0), `#e8e8f0` (7 uses, d=36), `#e7e7e7` (3 uses, d=42), `#e0e0e0` (2 uses, d=54), `#e5e5e5` (2 uses, d=45), `#e3e4e2` (1 uses, d=49), `#fafafa` (1 uses, d=9), `#ffe6ff` (1 uses, d=25)
- **#000000** cluster: `#000000` (29 uses, d=0), `#0f0f0f` (5 uses, d=26), `#1e1e1e` (2 uses, d=52), `#001f33` (1 uses, d=60), `#212121` (1 uses, d=57), `#191919` (1 uses, d=43)
- **#fc49ab** cluster: `#fc49ab` (23 uses, d=0), `#ff4d73` (4 uses, d=56)
- **#00b4ff** cluster: `#00b4ff` (11 uses, d=0), `#08b5ea` (1 uses, d=22), `#3399ff` (1 uses, d=58), `#29b8db` (1 uses, d=55)
- **#c792ea** cluster: `#c792ea` (10 uses, d=0), `#bbadff` (9 uses, d=36), `#d670d6` (1 uses, d=42)
- **#ffe600** cluster: `#ffe600` (10 uses, d=0), `#ffff00` (1 uses, d=25)
- **#cccccc** cluster: `#cccccc` (10 uses, d=0), `#c5c5c5` (2 uses, d=12), `#bbbbbb` (2 uses, d=29), `#cfd8dc` (1 uses, d=20), `#c6c6c6` (1 uses, d=10), `#aeafad` (1 uses, d=52), `#c7c7c7` (1 uses, d=9), `#dbb6b6` (1 uses, d=35)
- **#00ffe7** cluster: `#00ffe7` (8 uses, d=0), `#00ffdb` (1 uses, d=12)
- **#00ff80** cluster: `#00ff80` (6 uses, d=0), `#00ff51` (2 uses, d=47), `#23d18b` (1 uses, d=59)
- **#ff9500** cluster: `#ff9500` (6 uses, d=0), `#cca700` (3 uses, d=54), `#ff7300` (1 uses, d=34)
- **#252526** cluster: `#252526` (4 uses, d=0), `#474747` (4 uses, d=58), `#3a3d41` (2 uses, d=42), `#444444` (2 uses, d=53), `#454545` (2 uses, d=55), `#383b3d` (2 uses, d=37), `#333333` (2 uses, d=24), `#303031` (2 uses, d=19), `#3e4041` (1 uses, d=46), `#282828` (1 uses, d=5), `#404040` (1 uses, d=46), `#252525` (1 uses, d=1), `#322d2d` (1 uses, d=17), `#4f3232` (1 uses, d=46), `#2d2d30` (1 uses, d=15), `#381a1a` (1 uses, d=25), `#383d3f` (1 uses, d=40), `#062f4a` (1 uses, d=49), `#262626` (1 uses, d=1), `#2a2a2a` (1 uses, d=8), `#581725` (1 uses, d=53), `#2c2c2c` (1 uses, d=12), `#3f3f46` (1 uses, d=49), `#3f3f3f` (1 uses, d=44)
- **#ff0000** cluster: `#ff0000` (3 uses, d=0), `#ea210e` (1 uses, d=42)
- **#808080** cluster: `#808080` (3 uses, d=0), `#929292` (3 uses, d=31), `#888888` (2 uses, d=14), `#858585` (1 uses, d=9), `#74879f` (1 uses, d=34), `#707070` (1 uses, d=28), `#7f7f7f` (1 uses, d=2), `#999999` (1 uses, d=43), `#5f5f5f` (1 uses, d=57), `#646464` (1 uses, d=48), `#626262` (1 uses, d=52), `#7d7d7d` (1 uses, d=5), `#81b88b` (1 uses, d=57), `#8c8c8c` (1 uses, d=21), `#666666` (1 uses, d=45)
- **#264f78** cluster: `#264f78` (2 uses, d=0), `#495f77` (1 uses, d=38), `#515c6a` (1 uses, d=47), `#004972` (1 uses, d=39), `#575757` (1 uses, d=60), `#094771` (1 uses, d=31), `#45494e` (1 uses, d=53), `#4d4d4d` (1 uses, d=58)
- **#4490bf** cluster: `#4490bf` (2 uses, d=0), `#4e94ce` (1 uses, d=18), `#6c6cc4` (1 uses, d=54), `#3b8eea` (1 uses, d=44)
- **#94151b** cluster: `#94151b` (2 uses, d=0), `#b73a34` (1 uses, d=57), `#653723` (1 uses, d=59), `#86011d` (1 uses, d=24)
- **#c74e39** cluster: `#c74e39` (2 uses, d=0), `#cc6633` (1 uses, d=25), `#f14c4c` (1 uses, d=46)
- **#add6ff** cluster: `#add6ff` (1 uses, d=0), `#8db9e2` (1 uses, d=52)
- **#5a5a5a** cluster: `#5a5a5a` (1 uses, d=0), `#585858` (1 uses, d=3)
- **#a99040** cluster: `#a99040` (1 uses, d=0), `#9bb955` (1 uses, d=48)
- **#75beff** cluster: `#75beff` (1 uses, d=0), `#5fe8ff` (1 uses, d=47)

## Singletons (used exactly once — review for typos/strays)

- `#cfd8dc` — workbench.json: editor.foreground
- `#858585` — workbench.json: editorLineNumber.foreground
- `#c6c6c6` — workbench.json: editorLineNumber.activeForeground
- `#aeafad` — workbench.json: editorCursor.foreground
- `#3e4041` — workbench.json: editor.selectionBackground
- `#add6ff` — workbench.json: editor.selectionHighlightBackground
- `#495f77` — workbench.json: editor.selectionHighlightBorder
- `#282828` — workbench.json: editor.lineHighlightBorder
- `#e3e4e2` — workbench.json: editorWhitespace.foreground
- `#515c6a` — workbench.json: editor.findMatchBackground
- `#74879f` — workbench.json: editor.findMatchBorder
- `#004972` — workbench.json: editor.wordHighlightStrongBackground
- `#575757` — workbench.json: editor.wordHighlightBackground
- `#4e94ce` — workbench.json: editorLink.activeForeground
- `#404040` — workbench.json: editorIndentGuide.background1
- `#707070` — workbench.json: editorIndentGuide.activeBackground1
- `#5a5a5a` — workbench.json: editorRuler.foreground
- `#006400` — workbench.json: editorBracketMatch.background
- `#252525` — workbench.json: editorOverviewRuler.background
- `#7f7f7f` — workbench.json: editorOverviewRuler.border
- `#b73a34` — workbench.json: editorError.background
- `#a99040` — workbench.json: editorWarning.background
- `#999999` — workbench.json: editorCodeLens.foreground
- `#9bb955` — workbench.json: diffEditor.insertedTextBackground
- `#322d2d` — workbench.json: editorWidget.background
- `#5f5f5f` — workbench.json: editorWidget.resizeBorder
- `#4f3232` — workbench.json: editorSuggestWidget.selectedBackground
- `#2d2d30` — workbench.json: editorMarkerNavigation.background
- `#75beff` — workbench.json: editorMarkerNavigationInfo.background
- `#381a1a` — workbench.json: peekViewEditor.background
- `#001f33` — workbench.json: peekViewEditorGutter.background
- `#08b5ea` — workbench.json: peekViewEditor.matchHighlightBackground
- `#00ffdb` — workbench.json: peekViewEditor.matchHighlightBorder
- `#3399ff` — workbench.json: peekViewResult.selectionBackground
- `#646464` — workbench.json: selection.background
- `#ee0839` — workbench.json: activityBarBadge.background
- `#c7c7c7` — workbench.json: sideBar.foreground
- `#a7a7a7` — workbench.json: sideBarSectionHeader.foreground
- `#626262` — workbench.json: sideBarTitle.foreground
- `#383d3f` — workbench.json: list.hoverBackground
- `#dbb6b6` — workbench.json: list.hoverForeground
- `#094771` — workbench.json: list.activeSelectionBackground
- `#062f4a` — workbench.json: list.focusBackground
- `#585858` — workbench.json: tree.indentGuidesStroke
- `#653723` — workbench.json: listFilterWidget.background
- `#ea210e` — workbench.json: listFilterWidget.noMatchesOutline
- `#262626` — workbench.json: statusBar.background
- `#cc6633` — workbench.json: statusBar.debuggingBackground
- `#212121` — workbench.json: statusBar.noFolderBackground
- `#7d7d7d` — workbench.json: titleBar.activeForeground
- `#191919` — workbench.json: titleBar.inactiveBackground
- `#64ff00` — workbench.json: menubar.selectionBorder
- `#2a2a2a` — workbench.json: menu.background
- `#86011d` — workbench.json: button.hoverBackground
- `#45494e` — workbench.json: button.secondaryHoverBackground
- `#0584d9` — workbench.json: inputOption.activeBorder
- `#4d4d4d` — workbench.json: badge.background
- `#581725` — workbench.json: tab.activeBackground
- `#2c2c2c` — workbench.json: tab.inactiveBackground
- `#3f3f46` — workbench.json: pickerGroup.border
- `#81b88b` — workbench.json: gitDecoration.addedResourceForeground
- `#6c6cc4` — workbench.json: gitDecoration.conflictingResourceForeground
- `#8c8c8c` — workbench.json: gitDecoration.ignoredResourceForeground
- `#8db9e2` — workbench.json: gitDecoration.submoduleResourceForeground
- `#73c991` — workbench.json: gitDecoration.untrackedResourceForeground
- `#3f3f3f` — workbench.json: terminal.ansiBlack
- `#666666` — workbench.json: terminal.ansiBrightBlack
- `#3b8eea` — workbench.json: terminal.ansiBrightBlue
- `#29b8db` — workbench.json: terminal.ansiBrightCyan
- `#23d18b` — workbench.json: terminal.ansiBrightGreen
- `#d670d6` — workbench.json: terminal.ansiBrightMagenta
- `#f14c4c` — workbench.json: terminal.ansiBrightRed
- `#f5f543` — workbench.json: terminal.ansiBrightYellow
- `#ffff00` — tokens-ha.json: [1].settings.foreground
- `#ff00ff` — tokens-ha.json: [2].settings.foreground
- `#5fe8ff` — tokens-ha.json: [10].settings.foreground
- `#fafafa` — tokens-ha.json: [12].settings.foreground
- `#881a94` — tokens-ha.json: [16].settings.foreground
- `#ff7300` — tokens-ha.json: [17].settings.foreground
- `#ffe6ff` — tokens-ha.json: [22].settings.foreground
