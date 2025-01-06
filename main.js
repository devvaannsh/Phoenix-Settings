define(function (require, exports, module) {
    "use strict";
    const AppInit = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        WorkspaceManager = brackets.getModule("view/WorkspaceManager");

    const SettingsManager = require("./src/settings-manager");
    const SettingsAPI = require("./src/settings-api");

    let pluginPanel; // Store panel reference
    let panelMinSize = window.innerWidth / 2;

    // Import HTML content
    let panelHTML = require("text!html/main.html");
    // Load stylesheets
    ExtensionUtils.loadStyleSheet(module, "styles/main.css");

    /**
     * Responsible to add the settings inside the respective menu items
     */
    function setupSettings() {
        // Add a text input setting (large size)
        SettingsAPI.addSetting(
            "Editor", // menu item
            "Font Family", // setting title
            "Specify the font family to use", // description
            ["large-input-box", []], // setting type and values
            "Monaco" // default value
        );

        // Add a text input setting
        SettingsAPI.addSetting(
            "Editor",
            "Font Family 2",
            "Specify the font family to use",
            ["input-box", []],
            "Monaco"
        );

        // Add a text input setting
        SettingsAPI.addSetting(
            "Editor",
            "Font Family 3",
            "Specify the font family to use",
            ["small-input-box", []],
            "Monaco"
        );

        // Add a dropdown setting
        SettingsAPI.addSetting(
            "Editor",
            "Theme",
            "Select your preferred theme",
            ["dropdown", ["Light", "Dark", "High Contrast"]],
            "Light"
        );
        
        // Add a checkbox setting
        SettingsAPI.addSetting("Editor", "Word Wrap", "Enable word wrapping", ["checkbox", true], true);
        
        // Add a number input box setting
        SettingsAPI.addSetting("Editor", "Tab Size", "Enter the tab size", ["number", []], 18);

        // Add a scroll-bar setting
        SettingsAPI.addSetting(
            "Editor",
            "Font Size",
            "Adjust the font size",
            ["scroll-bar", [8, 72, 2]], // min: 8, max: 72, step: 2
            16 // default value
        );
    }

    /**
     * Responsible to call the required methods to setup the settings initial UI
     */
    function setupUI() {
        // Adds menu items in the settings panel. For methods reference, check out 'settings-manager.js' file
        SettingsManager._addMenuItem("Editor");
        SettingsManager._addMenuItem("Appearance");
        SettingsManager._addMenuItem("Linting");
        SettingsManager._addMenuItem("Code Hints");
        SettingsManager._addMenuItem("Live Preview");
        SettingsManager._addMenuItem("Files");
        SettingsManager._addMenuItem("Search");

        // This adds a menu item with a submenu option, i.e. more sub-menu-items can be added inside this
        SettingsManager._addMenuItemWithSubMenu("Extensions");
        SettingsManager._addMenuItem("Advanced");

        // Responsible to set the first menu item as active
        SettingsManager._setInitialActiveMenuItem();
    }

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
            setupUI();
            setupSettings();
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
