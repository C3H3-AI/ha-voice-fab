# [发布] Voice FAB — HA 全站悬浮语音助手按钮

**仓库**: `github.com/C3H3-AI/ha-voice-fab`
**HACS**: 自定义仓库

---

一个轻量悬浮按钮，在 HA **所有页面**可用——仪表盘、设置、面板，任何地方。轻触说话，拖动定位，双击回主页。

## 功能

| 操作 | 效果 |
|------|------|
| **轻触** | 打开原生 Assist 语音命令对话框 |
| **双击** | 返回 HA 默认仪表盘 |
| **拖动** | 自由移动按钮位置 |
| **长按** (800ms) | 隐藏按钮 |
| **右上角恢复图标** | 重新显示按钮 |
| **关闭 Assist** | 按钮自动回到默认位置 |

- 覆盖 HA **全部页面**，不限于 Lovelace
- 完全透明覆盖，零布局偏移
- 手机触摸友好（完整支持 pointer 事件）
- 仅 **1 个 JS 文件**，无额外依赖

## 安装

### HACS

1. HACS → 集成 → 右上角菜单 → 自定义仓库
2. 添加: `https://github.com/C3H3-AI/ha-voice-fab`
3. 搜索 "Voice FAB" 安装
4. 重启 HA
5. 设置 → 设备与服务 → 添加 "Voice FAB"

### 手动

复制 `custom_components/voice_fab/` 到 HA 的 `custom_components/` 目录，重启后添加集成。

## 要求

- Home Assistant 2024.1+
- 已配置 Assist 语音助手

## 与 Claw Plus 配合使用

Voice FAB 还与 [Claw Plus](https://github.com/C3H3-AI/ha-claw-plus) 兼容——Claw Assistant 的全面控制面板。两个集成同时安装时：

- Claw Plus 自动接管，面板中仅一个开关控制
- 开关即时注入/移除按钮，无需刷新
- 安装 Voice FAB 时会提示"已被 Claw Plus 接管，无需单独安装"

## 源码与反馈

- GitHub: [github.com/C3H3-AI/ha-voice-fab](https://github.com/C3H3-AI/ha-voice-fab)
- Bug 与需求: [提交 Issue](https://github.com/C3H3-AI/ha-voice-fab/issues)

---

*如果觉得有用，欢迎在 GitHub 点个 ⭐！下载量通过 README 上的 GitHub Releases 徽章自动统计。*
