"""Voice FAB - 全站悬浮语音助手按钮"""
import logging
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig

DOMAIN = "voice_fab"

_LOGGER = logging.getLogger(__name__)

_VFAB_URL = f"/api/{DOMAIN}/voice_fab.js?v=1.1.1"
_VFAB_DATA = "voice_fab_loaded"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """注册静态路径，让前端全局加载 voice_fab.js"""
    hass.data.setdefault(DOMAIN, {})

    if not hass.data[DOMAIN].get(_VFAB_DATA):
        js_path = Path(__file__).parent / "www" / "voice_fab.js"
        await hass.http.async_register_static_paths([
            StaticPathConfig(f"/api/{DOMAIN}/voice_fab.js", str(js_path), cache_headers=False),
        ])
        frontend.add_extra_js_url(hass, _VFAB_URL)
        hass.data[DOMAIN][_VFAB_DATA] = True
        _LOGGER.info("Voice fab loaded!")

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """卸载时移除 JS 注入"""
    if hass.data[DOMAIN].get(_VFAB_DATA):
        frontend.remove_extra_js_url(hass, _VFAB_URL)
        hass.data[DOMAIN].pop(_VFAB_DATA, None)
        _LOGGER.info("Voice fab unloaded!")
    hass.data[DOMAIN].pop(entry.entry_id, None)
    return True