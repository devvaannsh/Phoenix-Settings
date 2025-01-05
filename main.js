define(function (require, exports, module) {
    "use strict";
    const AppInit = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        WorkspaceManager = brackets.getModule("view/WorkspaceManager");

    const SettingsManager = require("./settings-manager");

    let pluginPanel; // Store panel reference
    let panelMinSize = window.innerWidth / 2;

    // Import HTML content
    let panelHTML = require("text!html/main.html");
    // Load stylesheets
    ExtensionUtils.loadStyleSheet(module, "styles/main.css");

    function togglePanelVisibility() {
        if (pluginPanel.isVisible()) {
            pluginPanel.hide();
        } else {
            pluginPanel.show();
        }
    }

function handleSettingsButtonClick() {
    if (!pluginPanel) {
        const $panel = $(panelHTML);
        const $toolbarIcon = $("<a>");
        pluginPanel = WorkspaceManager.createPluginPanel("phoenix.settings", $panel, panelMinSize, $toolbarIcon);
        
        // add things here!
        SettingsManager._addMenuItem('Editor');
        SettingsManager._addMenuItem('Appearance');
        SettingsManager._addMenuItem('Linting');
        SettingsManager._addMenuItem('Code Hints');
        SettingsManager._addMenuItem('Live Preview');
        SettingsManager._addMenuItem('Files');
        SettingsManager._addMenuItem('Search');
        SettingsManager._addMenuItemWithSubMenu('Extensions');
        SettingsManager._addMenuItem('Advanced');
        
        // this sets the first menu item as active
        SettingsManager._setInitialActiveMenuItem();
        
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
