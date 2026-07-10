"""Voice FAB - 全站悬浮语音助手按钮"""
import logging
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
import voluptuous as vol

DOMAIN = "voice_fab"

_LOGGER = logging.getLogger(__name__)

_VFAB_URL = f"/api/{DOMAIN}/voice_fab.js?v=1.1.1"
_VFAB_DATA = "voice_fab_loaded"

SERVICE_SET_FAB = "set_fab_enabled"
SERVICE_SET_FAB_SCHEMA = vol.Schema({
    vol.Optional("enabled", default=True): bool,
})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """注册静态路径与 set_fab_enabled 服务。"""

    # 检测 claw_plus 是否已加载 → 它来接管（仍返回 True 保证安装成功）
    from homeassistant.config_entries import ConfigEntryState
    cp_entries = hass.config_entries.async_entries("claw_plus")
    vf_managed_by_cp = any(e.state is ConfigEntryState.LOADED for e in cp_entries)
    if vf_managed_by_cp:
        _LOGGER.info("Voice FAB 已被 Claw Plus 接管，JS 注入由 Claw Plus 面板管理。")

    hass.data.setdefault(DOMAIN, {})

    # 注册静态路径（仅一次）
    if not hass.data[DOMAIN].get(_VFAB_DATA):
        js_path = Path(__file__).parent / "www" / "voice_fab.js"
        await hass.http.async_register_static_paths([
            StaticPathConfig(f"/api/{DOMAIN}/voice_fab.js", str(js_path), cache_headers=False),
        ])
        hass.data[DOMAIN][_VFAB_DATA] = True

    # 注册服务：供 claw_plus 或其他外部实体调用
    async def handle_set_fab(call):
        enabled = call.data.get("enabled", True)
        if enabled:
            frontend.add_extra_js_url(hass, _VFAB_URL)
            _LOGGER.info("Voice fab enabled via service")
        else:
            frontend.remove_extra_js_url(hass, _VFAB_URL)
            _LOGGER.info("Voice fab disabled via service")

    if not hass.services.has_service(DOMAIN, SERVICE_SET_FAB):
        hass.services.async_register(DOMAIN, SERVICE_SET_FAB, handle_set_fab, schema=SERVICE_SET_FAB_SCHEMA)

    # 默认注入（仅独立使用场景；claw_plus 接管时由面板控制开关）
    if not vf_managed_by_cp:
        frontend.add_extra_js_url(hass, _VFAB_URL)
        _LOGGER.info("Voice fab loaded!")
    else:
        _LOGGER.info("Voice fab managed by Claw Plus panel - no auto-injection")

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """卸载时移除 JS 注入"""
    if hass.data[DOMAIN].get(_VFAB_DATA):
        frontend.remove_extra_js_url(hass, _VFAB_URL)
        hass.data[DOMAIN].pop(_VFAB_DATA, None)
        _LOGGER.info("Voice fab unloaded!")
    hass.data[DOMAIN].pop(entry.entry_id, None)
    return True
