"""Voice FAB - 全站悬浮语音助手按钮"""
import os
from homeassistant.core import HomeAssistant


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """注册静态路径，让前端加载 voice_fab.js"""
    www_path = os.path.join(os.path.dirname(__file__), "www")
    await hass.http.async_register_static_paths([
        ("/api/voice_fab", www_path),
    ])

    # 在前端注入脚本加载
    hass.components.frontend.async_register_built_in_panel(
        component_name="iframe",
        sidebar_title="Voice FAB",
        sidebar_icon="mdi:microphone",
        frontend_url_path="voice_fab",
        config={
            "url": "/api/voice_fab/voice_fab.js",
        },
        require_admin=False,
    )

    return True


def setup(hass, config):
    """同步版本（兼容旧版）"""
    return True


async def async_remove(hass: HomeAssistant) -> None:
    """移除时清理"""
    pass
