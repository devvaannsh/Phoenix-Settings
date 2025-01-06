
define(function (require, exports, module) {
    "use strict";
    // Import HTML content
    let panelHTML = require("text!html/settings-search.html");
    
    
    /**
     * @private
     * 
     * Responsible to remove the 'active' class from all the menu items.
     * This function is called whenever user switches between the menu items.
     * So to remove the 'active' class from the previous menu-item, we call this function.
     */
    function _removeActiveClassFromMenuItems() {
        const allMenuItems = document.querySelectorAll(".menu-item");
        allMenuItems.forEach((item) => {
            item.classList.remove("active");
            
            // Reset all sub-menu chevrons to default.
            // By default 'chevron-right' icon is displayed
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
    }
    
    
    /**
     * @private
     * Handles the click event for menu items
     *
     * @param {HTMLElement} clickedItem | The menu item that was clicked
     */
    function _handleMenuItemClick(clickedItem) {
        // Remove active class from all menu items
        _removeActiveClassFromMenuItems();
        
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
     * 
     * [Internal API] (Not to be used by extension devs)
     * Sets the first menu item as active
     */
    function _setInitialActiveMenuItem() {
        const menusWrapper = document.querySelector("#menus-wrapper");
        if (menusWrapper) {
            const firstMenuItem = menusWrapper.querySelector(".menu-item");
            
            // make sure that there is some existing menu item
            if (firstMenuItem) {
                firstMenuItem.classList.add("active");
            }
        }
    }

    
    /**
     * @private
     * 
     * [Internal API] (Not to be used by extension devs)
     * Responsible to add a menu item to the settings panel
     *
     * @param {String} name | The name that will be displayed in the panel.
     * @param {Number | undefined} [index] | The position where the menu item is to be added. If the index is not provided or the index is invalid, then in that case the menu item is added at the end. If a valid index is provided it is added at that position. Starts from [1]
     * @return [HTMLElement] returns the html element after adding. This is generally not needed. Just calling this method will add the required menu item to the settings panel.
     */
    function _addMenuItem(name, index) {
        // make sure the name parameter is valid
        if (typeof name !== "string") {
            throw new TypeError("Menu item name must be a string");
        }

        const menusWrapper = document.querySelector("#menus-wrapper");
        if (!menusWrapper) {
            console.error("Menus wrapper not found in the panel");
            return;
        }

        // Create the new menu item
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.textContent = name;

        // add the click event listener to listen for clicks on this menu item
        menuItem.addEventListener("click", function () {
            _handleMenuItemClick(this);
        });

        // get the existing menu items to get the last valid index
        const existingItems = menusWrapper.getElementsByClassName("menu-item");

        // Validate and handle index
        if (index !== undefined) {
            // make sure the index is a number and within the valid range.
            if (
                typeof index === "number" &&
                Number.isInteger(index) &&
                index > 0 &&
                index <= existingItems.length + 1
            ) {
                // insert the new menu item at the specified index
                const referenceNode = existingItems[index - 1] || null;
                menusWrapper.insertBefore(menuItem, referenceNode);
            } else {
                // if the index is invalid, add to the last
                menusWrapper.appendChild(menuItem);
            }
        } else {
            // index not provided, add to the last
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
     * [Internal API] (Not to be used by extension devs)
     * This adds a menu item with sub-menu functionality to the settings panel
     *
     * @param {String} name | The name that will be displayed in the panel.
     * @param {Number | undefined} [index] | The position where the menu item is to be added. If the index is not provided or the index is invalid, then in that case the menu item is added at the end. If a valid index is provided it is added at that position. Starts from [1]
     * @return [HTMLElement] returns the html element after adding. This is generally not needed. Just calling this method will add the required menu item to the settings panel.
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

        // Add click event listener to listen for click events on this menu item
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
            // make sure index is a number and within valid range
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
