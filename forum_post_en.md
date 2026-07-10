# [Release] Voice FAB — Floating voice assistant button for all HA pages

**Repository**: `github.com/C3H3-AI/ha-voice-fab`
**HACS**: Custom repository

---

A lightweight floating button that works across **every** Home Assistant page — dashboard, settings, panels, you name it. Tap to talk, drag to move, double-tap to go home.

## Demo

![demo](https://raw.githubusercontent.com/C3H3-AI/ha-voice-fab/main/.github/demo.gif)

*(screenshot coming — in the meantime, try it yourself!)*

## Features

| Operation | What it does |
|-----------|-------------|
| **Tap** | Opens the native Assist voice command dialog |
| **Double-tap** | Returns to the HA default dashboard |
| **Drag** | Repositions the button freely |
| **Long-press** (800ms) | Hides the button |
| **Restore icon** (top-right corner) | Brings the button back |
| **Close Assist** | Button auto-returns to default position |

- Works on **all** HA pages — not limited to Lovelace
- Completely transparent overlay — zero layout shift
- Phone touch-friendly (pointer events are fully supported)
- Just **1 JS file**, no extra dependencies

## Installation

### Via HACS

1. HACS → Integrations → 3-dot menu → Custom repositories
2. Add: `https://github.com/C3H3-AI/ha-voice-fab`
3. Search "Voice FAB" and install
4. Restart HA
5. Settings → Devices & Services → Add "Voice FAB"

### Manual

Copy `custom_components/voice_fab/` to your HA `custom_components/`, restart, then add the integration.

## Requirements

- Home Assistant 2024.1+
- Assist pipeline configured

## Bonus: Claw Plus integration

Voice FAB is also compatible with [Claw Plus](https://github.com/C3H3-AI/ha-claw-plus) — a full-featured Claw Assistant control panel. When both are installed, Claw Plus detects Voice FAB and manages the floating button through its own panel toggle, so you get:

- One unified switch in the Claw Plus UI
- Claw Plus injects/removes the button instantly (no refresh needed)
- Config flow shows a friendly message: "Already managed by Claw Plus"

## Source & feedback

- GitHub: [github.com/C3H3-AI/ha-voice-fab](https://github.com/C3H3-AI/ha-voice-fab)
- Issues & feature requests: [open an issue](https://github.com/C3H3-AI/ha-voice-fab/issues)

---

*If you find this useful, a ⭐ on GitHub is always appreciated! Download stats are tracked via the GitHub Releases badge on the README.*
