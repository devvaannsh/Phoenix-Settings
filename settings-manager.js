define(function (require, exports, module) {
    "use strict";
    // Import HTML content
    let panelHTML = require("text!html/main.html");

    /**
     * @private
     *
     * This adds a menu item to the settings panel
     *
     * @param {String} name | The name that will be displayed in the panel.
     * @param {Number} [index] | Optional. The position of the menu item. If not provided or invalid, item will be added at the end.
     * @throws {TypeError} If name is not a string.
     */
    function _addMenuItem(name, index) {
        // Validate name parameter
        if (typeof name !== "string") {
            throw new TypeError("Menu item name must be a string");
        }

        // Get the actual menus wrapper from the current panel
        const menusWrapper = document.querySelector("#menus-wrapper");
        
        if (!menusWrapper) {
            console.error("Menus wrapper not found in the panel");
            return;
        }

        // Create the new menu item
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.textContent = name;

        // Get existing menu items to determine valid index range
        const existingItems = menusWrapper.getElementsByClassName("menu-item");
        
        // Validate and handle index
        if (index !== undefined) {
            // Check if index is a number and within valid range
            if (typeof index === "number" && 
                Number.isInteger(index) && 
                index > 0 && 
                index <= existingItems.length + 1) {
                // Insert at specified position
                const referenceNode = existingItems[index - 1] || null;
                menusWrapper.insertBefore(menuItem, referenceNode);
            } else {
                // Invalid index, append to end
                menusWrapper.appendChild(menuItem);
            }
        } else {
            // No index provided, append to end
            menusWrapper.appendChild(menuItem);
        }
    }

    /**
     * @private
     *
     * This adds a menu item with sub-menu functionality to the settings panel
     *
     * @param {String} name | The name that will be displayed in the panel.
     * @param {Number} [index] | Optional. The position of the menu item. If not provided or invalid, item will be added at the end.
     * @throws {TypeError} If name is not a string.
     */
    function _addMenuItemWithSubMenu(name, index) {
        // Validate name parameter
        if (typeof name !== "string") {
            throw new TypeError("Menu item name must be a string");
        }

        // Get the actual menus wrapper from the current panel
        const menusWrapper = document.querySelector("#menus-wrapper");
        
        if (!menusWrapper) {
            console.error("Menus wrapper not found in the panel");
            return;
        }

        // Create the main menu item container
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item has-sub-menu";

        // Create the menu item name div
        const menuItemName = document.createElement("div");
        menuItemName.className = "menu-item-name";
        menuItemName.textContent = name;

        // Create the sub-menu arrow container
        const openSubMenu = document.createElement("div");
        openSubMenu.className = "open-sub-menu";

        // Create the SVG arrow
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 512 512");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z");
        path.setAttribute("fill", "white");

        // Assemble the components
        svg.appendChild(path);
        openSubMenu.appendChild(svg);
        menuItem.appendChild(menuItemName);
        menuItem.appendChild(openSubMenu);

        // Get existing menu items to determine valid index range
        const existingItems = menusWrapper.getElementsByClassName("menu-item");
        
        // Validate and handle index
        if (index !== undefined) {
            // Check if index is a number and within valid range
            if (typeof index === "number" && 
                Number.isInteger(index) && 
                index > 0 && 
                index <= existingItems.length + 1) {
                // Insert at specified position
                const referenceNode = existingItems[index - 1] || null;
                menusWrapper.insertBefore(menuItem, referenceNode);
            } else {
                // Invalid index, append to end
                menusWrapper.appendChild(menuItem);
            }
        } else {
            // No index provided, append to end
            menusWrapper.appendChild(menuItem);
        }
    }

    module.exports = {
        _addMenuItem,
        _addMenuItemWithSubMenu
    };
});