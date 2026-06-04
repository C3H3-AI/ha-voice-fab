# Voice FAB

Home Assistant 全站悬浮语音助手按钮。

## 功能

- 在 HA 任意页面显示悬浮按钮
- 轻触按钮打开原生 Assist 语音助手
- 自动隐藏，不遮挡界面
- 拖动按钮自由定位
- 关闭 Assist 后自动恢复按钮
- 手机触摸友好

## 安装

### 方法 1: HACS (推荐)

1. 进入 HACS → 集成
2. 点击右上角菜单 → 添加自定义仓库
3. 填入仓库地址: `https://github.com/your-repo/ha-voice-fab`
4. 搜索 "Voice FAB" 安装

### 方法 2: 手动安装

1. 下载本仓库
2. 将 `voice_fab` 文件夹复制到 `custom_components/`
3. 重启 Home Assistant

## 使用

安装后自动生效，无需配置。

### 操作说明

| 操作 | 功能 |
|------|------|
| 轻触按钮 | 打开 Assist 语音助手 |
| 按住拖动 | 移动按钮位置 |
| 长按 (800ms) | 隐藏按钮 |
| 点击右上角图标 | 恢复显示按钮 |
| 关闭 Assist | 按钮自动恢复 |

## 要求

- Home Assistant 2024.1+
- 已配置 Assist 语音助手

## 配置

可选，在 `configuration.yaml`:

```yaml
voice_fab:
  enabled: true  # 默认 true，可设为 false 禁用
```

## 更新日志

### v1.0.0
- 首次发布
- 基础功能：悬浮按钮 + Assist 语音助手

## 贡献

欢迎提交 Issue 和 Pull Request！
