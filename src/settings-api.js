define(function (require, exports, module) {
    "use strict";

    // core internal APIs only
    const SECTIONS = {
        EDITOR: "Editor",
        APPEARANCE: "Appearance",
        LINTING: "Linting",
        CODE_HINTS: "Code Hints",
        LIVE_PREVIEW: "Live Preview",
        FILES: "Files",
        SEARCH: "Search",
        EXTENSIONS: "Extensions",
        ADVANCED: "Advanced"
    };

    const SECTION_TYPES = {
        HEADING1: "heading1",
        HEADING2: "heading2",
        PARAGRAPH: "paragraph",
        DROPDOWN: "dropdown",
        NUMBER: "number"
    };

    // DOM elements (to improve efficiency as we won't need to get the element everytime while working with it)
    const MENUS_WRAPPER = document.querySelector("#menus-wrapper");

    /**
     * This function is responsible to add sections to the settings panel
     *
     * @param {String} sectionName - the name of the section, this will be displayed in the UI
     */
    function _createMainSection(sectionName) {
        if (!MENUS_WRAPPER) {
            console.error("Menus wrapper not found in the panel");
            return;
        }

        // Create the new menu item
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.textContent = sectionName;

        MENUS_WRAPPER.appendChild(menuItem);
    }


    // Loop through all the section items and create main sections
    Object.values(SECTIONS).forEach((sectionName) => {
        _createMainSection(sectionName);
    });
});
