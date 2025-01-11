define(function (require, exports, module) {
    "use strict";
    const AppInit = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        WorkspaceManager = brackets.getModule("view/WorkspaceManager");

    // Import scripts
    const SettingsAPI = require("./settings-api");

    // Import HTML content
    let panelHTML = require("text!htmlContent/main.html");
    // Load stylesheets
    ExtensionUtils.loadStyleSheet(module, "styles/main.css");

    let pluginPanel; // Store panel reference
    let panelMinSize = window.innerWidth / 2;

    /**
     * Responsible to toggle the panel, i.e. hide/unhide on button click
     */
    function togglePanelVisibility() {
        if (pluginPanel.isVisible()) {
            pluginPanel.hide();
        } else {
            pluginPanel.show();
        }
    }

    /**
     * This function gets triggered when the settings button is clicked.
     * It opens up the panel if not already opened.
     * Or if it is already opened, it hides it.
     */
    function handleSettingsButtonClick() {
        if (!pluginPanel) {
            const $panel = $(panelHTML);
            const $toolbarIcon = $("<a>");
            pluginPanel = WorkspaceManager.createPluginPanel("phoenix.settings", $panel, panelMinSize, $toolbarIcon);
        }
        togglePanelVisibility();
    }

    const MY_COMMAND_ID = "phoenix_settings";
    CommandManager.register("Settings", MY_COMMAND_ID, handleSettingsButtonClick);

    const menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);

    AppInit.appReady(function () {
        console.log("Phoenix Settings Extension Initialized!");
    });
});
