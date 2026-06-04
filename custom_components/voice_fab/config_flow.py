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
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Voice FAB", data={})

        return self.async_show_form(step_id="user")

    async def async_step_import(self, import_config=None):
        """Handle import."""
        return await self.async_step_user(import_config)