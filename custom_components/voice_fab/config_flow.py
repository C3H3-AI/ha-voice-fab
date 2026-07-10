"""Config flow for Voice FAB."""
from homeassistant import config_entries
from homeassistant.core import HomeAssistant
import voluptuous as vol

from . import DOMAIN


class VoiceFabConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Voice FAB."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        # 检测 claw_plus 是否已加载 → 提示无需安装
        from homeassistant.config_entries import ConfigEntryState
        cp_entries = self.hass.config_entries.async_entries("claw_plus")
        if any(e.state is ConfigEntryState.LOADED for e in cp_entries):
            return self.async_abort(
                reason="managed_by_claw_plus",
                description_placeholders={},
            )

        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Voice FAB", data={})

        return self.async_show_form(step_id="user")

    async def async_step_import(self, import_config=None):
        """Handle import."""
        return await self.async_step_user(import_config)