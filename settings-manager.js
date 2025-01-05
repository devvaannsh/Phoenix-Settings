define(function (require, exports, module) {
    "use strict";
    // Import HTML content
    let panelHTML = require("text!html/settings-search.html");

    /**
     * @private
     *
     * Handles the click event for menu items
     *
     * @param {HTMLElement} clickedItem - The menu item that was clicked
     */
    function _handleMenuItemClick(clickedItem) {
        // Remove active class from all menu items
        const allMenuItems = document.querySelectorAll(".menu-item");
        allMenuItems.forEach((item) => {
            item.classList.remove("active");
            // Reset all sub-menu chevrons to right position
            if (item.classList.contains("has-sub-menu")) {
                // to remove default background style from chevron arrow
                document.querySelector(".open-sub-menu").classList.remove("active");
                const path = item.querySelector("path");
                path.setAttribute(
                    "d",
                    "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                );
            }
        });

        // Add active class to clicked item
        clickedItem.classList.add("active");

        // If it's a sub-menu item, set chevron to down position
        if (clickedItem.classList.contains("has-sub-menu")) {
            document.querySelector(".open-sub-menu").classList.add("active");
            const path = clickedItem.querySelector("path");
            // Set to chevron-down
            path.setAttribute(
                "d",
                "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            );
        }
    }

    /**
     * @private
     * Sets the first menu item as active if it exists
     */
    function _setInitialActiveMenuItem() {
        const menusWrapper = document.querySelector("#menus-wrapper");
        if (menusWrapper) {
            const firstMenuItem = menusWrapper.querySelector(".menu-item");
            if (firstMenuItem) {
                firstMenuItem.classList.add("active");
            }
        }
    }

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

        // Add click event listener
        menuItem.addEventListener("click", function () {
            _handleMenuItemClick(this);
        });

        // Get existing menu items to determine valid index range
        const existingItems = menusWrapper.getElementsByClassName("menu-item");

        // Validate and handle index
        if (index !== undefined) {
            // Check if index is a number and within valid range
            if (
                typeof index === "number" &&
                Number.isInteger(index) &&
                index > 0 &&
                index <= existingItems.length + 1
            ) {
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

        // If this is the first menu item added, make it active
        if (existingItems.length === 0) {
            menuItem.classList.add("active");
        }

        return menuItem;
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
        path.setAttribute(
            "d",
            "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        );
        path.setAttribute("fill", "white");

        // Assemble the components
        svg.appendChild(path);
        openSubMenu.appendChild(svg);
        menuItem.appendChild(menuItemName);
        menuItem.appendChild(openSubMenu);

        // Add click event listener
        menuItem.addEventListener("click", function () {
            _handleMenuItemClick(this);
        });

        // Get existing menu items to determine valid index range
        const existingItems = menusWrapper.getElementsByClassName("menu-item");

        // If this is the first menu item being added, make it active
        if (existingItems.length === 0) {
            menuItem.classList.add("active");
        }

        // Validate and handle index
        if (index !== undefined) {
            // Check if index is a number and within valid range
            if (
                typeof index === "number" &&
                Number.isInteger(index) &&
                index > 0 &&
                index <= existingItems.length + 1
            ) {
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

        return menuItem;
    }

    module.exports = {
        _addMenuItem,
        _addMenuItemWithSubMenu,
        _setInitialActiveMenuItem
    };
});
