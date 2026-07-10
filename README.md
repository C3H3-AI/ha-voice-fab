# Voice FAB

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Downloads](https://img.shields.io/github/downloads/C3H3-AI/ha-voice-fab/total.svg?style=flat&logo=github)](https://github.com/C3H3-AI/ha-voice-fab/releases)

> **English** · [中文](#中文)

A floating voice assistant button for **all** Home Assistant pages. Works with the native Assist pipeline — tap to talk, drag to reposition.

---

## English

### Features

- Floating button on **every** HA page (dashboard, settings, panels, etc.)
- Tap to open the native Assist voice command dialog
- Drag to reposition freely
- Double-tap to return to the HA default dashboard
- Long-press (800ms) to hide the button
- Auto-recovery after closing Assist
- Touch-friendly on mobile
- Compatible with [Claw Plus](https://github.com/C3H3-AI/ha-claw-plus) — when both are installed, Claw Plus manages the button via its own panel toggle

### Installation

#### Option 1: HACS (recommended)

1. Go to HACS → Integrations
2. Click the three-dot menu → Custom repositories
3. Add: `https://github.com/C3H3-AI/ha-voice-fab`
4. Search for "Voice FAB" and install
5. Restart Home Assistant
6. Add the "Voice FAB" integration from Settings → Devices & Services

#### Option 2: Manual

1. Download this repository
2. Copy `custom_components/voice_fab` to your HA `custom_components/` directory
3. Restart Home Assistant
4. Add the "Voice FAB" integration from Settings → Devices & Services

### Usage

| Action | Result |
|--------|--------|
| Tap | Open Assist voice command dialog |
| Double-tap | Go to HA default dashboard |
| Drag | Move the button position |
| Long-press (800ms) | Hide the button |
| Click restore icon (top-right) | Show the button again |
| Close Assist | Button returns to default position |

### Requirements

- Home Assistant 2024.1+
- Assist pipeline configured

---

## 中文

### 功能

- 在 HA **所有**页面显示悬浮按钮
- 轻触按钮打开原生 Assist 语音助手
- 双击按钮回到 HA 默认主页
- 拖动按钮自由定位
- 长按 (800ms) 隐藏按钮
- 关闭 Assist 后自动恢复按钮
- 手机触摸友好
- 与 [Claw Plus](https://github.com/C3H3-AI/ha-claw-plus) 兼容：两个集成同时安装时，由 Claw Plus 面板统一管理开关

### 安装

#### HACS（推荐）

1. 进入 HACS → 集成
2. 点击右上角菜单 → 添加自定义仓库
3. 填入 `https://github.com/C3H3-AI/ha-voice-fab`
4. 搜索 "Voice FAB" 安装
5. 重启 Home Assistant
6. 在 设置 → 设备与服务 中添加 "Voice FAB"

#### 手动安装

1. 下载本仓库
2. 将 `custom_components/voice_fab` 文件夹复制到 HA 的 `custom_components/` 目录
3. 重启 Home Assistant
4. 在 设置 → 设备与服务 中添加 "Voice FAB"

### 使用

| 操作 | 功能 |
|------|------|
| 轻触 | 打开 Assist 语音助手 |
| 双击 | 回到 HA 默认主页 |
| 按住拖动 | 移动按钮位置 |
| 长按 (800ms) | 隐藏按钮 |
| 点击右上角图标 | 恢复显示按钮 |
| 关闭 Assist | 按钮自动恢复 |

### 要求

- Home Assistant 2024.1+
- 已配置 Assist 语音助手

---

## Changelog

### v1.1.0

- `set_fab_enabled` service for external control (used by Claw Plus)
- Config flow: aborts with descriptive message when Claw Plus is already managing FAB
- Translations: English + Chinese (zh-Hans)
- New style: transparent gray border + white line-art microphone icon
- Double-tap to return to HA default dashboard
- Removed localStorage persistence — button always shows on fresh load

### v1.0.0

- Initial release
- Basic floating button + Assist integration
