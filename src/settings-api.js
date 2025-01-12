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

    // Track the active section
    let activeSection = SECTIONS.EDITOR; // Default active section

    /**
     * This function is responsible to add a setting to a specific section
     *
     * @private
     * @param {String} section - Section identifier from SECTIONS
     * @param {String} type - Setting type from SECTION_TYPES
     * @param {Object|String} config - Setting configuration in the form of an Object. It may also be plain String, which is when a heading is to be added to the setting element.
     */
    function _addSetting(section, type, config) {
        if (!SETTINGS_WRAPPER) {
            console.error("Settings wrapper not found in the panel");
            return;
        }

        const settingContainer = document.createElement("div");
        settingContainer.className = "setting";
        settingContainer.dataset.section = section; // Add the section identifier

        // For headings, we don't need the setting structure as this is just text
        if ([SECTION_TYPES.HEADING1, SECTION_TYPES.HEADING2].includes(type)) {
            // if the type is heading then the config must be a string only.
            if (typeof config !== "string") {
                console.error("If section type is a heading, then the config must be string");
                return;
            }

            if (type === SECTION_TYPES.HEADING1) {
                const heading = document.createElement("h1");
                heading.textContent = config;

                settingContainer.appendChild(heading);
            }
        }

        // Initially hide settings that don't belong to active section
        if (section !== activeSection) {
            settingContainer.style.display = "none";
        }

        SETTINGS_WRAPPER.appendChild(settingContainer);
    }

    /**
     * This function is responsible to add sections to the settings panel
     *
     * @private
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

        if (sectionName === activeSection) {
            section.classList.add("active");
        }
        section.textContent = sectionName;

        // Add click handler for section switching
        section.addEventListener("click", () => {
            switchSection(sectionName);
        });

        SECTIONS_WRAPPER.appendChild(section);
    }

    /**
     * Switches the active section in the settings panel.
     *
     * This function handles updating the active section visually in the navbar
     * and ensures that only the settings relevant to the selected section are displayed.
     * It hides settings for other sections
     *
     * @param {String} newSection - The section name to switch to (must match one of the SECTIONS).
     */
    function switchSection(newSection) {
        // Update active section
        activeSection = newSection;

        // Update section highlighting
        const sections = SECTIONS_WRAPPER.querySelectorAll(".section");
        sections.forEach((section) => {
            if (section.textContent === newSection) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Show/hide settings based on active section
        const settings = SETTINGS_WRAPPER.querySelectorAll(".setting");
        settings.forEach((setting) => {
            if (setting.dataset.section === newSection) {
                setting.style.display = "";
            } else {
                setting.style.display = "none";
            }
        });
    }

    /**
     * Driver function
     */
    function _init() {
        // Loop through all the section items and create main sections
        // Also add the heading inside every section
        Object.values(SECTIONS).forEach((sectionName) => {
            _createMainSection(sectionName);
            _addSetting(sectionName, SECTION_TYPES.HEADING1, sectionName);
        });
    }

    _init();
});
