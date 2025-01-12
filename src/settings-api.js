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

    // Fetch the DOM element (added to global to improve efficiency as we won't need to fetch it everytime while working with it)
    const SECTIONS_WRAPPER = document.querySelector("#sections-wrapper");
    const SETTINGS_WRAPPER = document.querySelector("#settings");

    function _addSetting(section, type, config) {
        if (!SETTINGS_WRAPPER) {
            console.error("Settings wrapper not found in the panel");
            return;
        }
        
        const settingContainer = document.createElement("div");
        settingContainer.className = "setting";
        
        // For headings, we don't need the setting structure
        if ([SECTION_TYPES.HEADING1, SECTION_TYPES.HEADING2].includes(type)) {
            
            if(typeof config !== "string") {
                console.error("If section type is a heading, then the config must be string");
                return;
            }
            
            if(type === SECTION_TYPES.HEADING1) {
                const heading = document.createElement("h1");
                heading.textContent = config;
                heading.className = "main-heading";
                
                settingContainer.appendChild(heading);
            }
        }
        
        SETTINGS_WRAPPER.appendChild(settingContainer);        
    }

    /**
     * This function is responsible to add sections to the settings panel
     *
     * @param {String} sectionName - the name of the section, this will be displayed in the UI
     */
    function _createMainSection(sectionName) {
        if (!SECTIONS_WRAPPER) {
            console.error("Sections wrapper not found in the panel");
            return;
        }

        // Create the new menu item
        const section = document.createElement("div");
        section.className = "section";
        section.textContent = sectionName;

        SECTIONS_WRAPPER.appendChild(section);   
    }

    function _init() {
        // Loop through all the section items and create main sections
        Object.values(SECTIONS).forEach((sectionName) => {
            _createMainSection(sectionName);
        });

        _addSetting(SECTIONS.EDITOR, SECTION_TYPES.HEADING1, "Editor");
    }

    _init();
});
