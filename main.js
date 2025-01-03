define(function (require, exports, module) {
    "use strict";
    const AppInit = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        WorkspaceManager = brackets.getModule("view/WorkspaceManager");

    let pluginPanel; // Store panel reference
    
    let panelMinSize = window.innerWidth / 3;
    
    function togglePanelVisibility() { 
        if (pluginPanel.isVisible()) {
            pluginPanel.hide();
        } else {
            pluginPanel.show();
        }
    }

    function handleSettingsButtonClick() {
        if (!pluginPanel) {
            const $panel = $("<div>")
                .attr("id", "phoenix-settings-panel")
                .html("<h3>My Plugin Panel</h3><p>Hello from the panel!</p>");
            const $toolbarIcon = $("<a>");
            pluginPanel = WorkspaceManager.createPluginPanel(
                "phoenix.settings", $panel, panelMinSize, $toolbarIcon
            );
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