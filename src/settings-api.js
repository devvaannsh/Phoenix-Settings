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
        HEADING1: "heading1", // for section heading
        DROPDOWN: "dropdown", // setting value - dropdown
        NUMBER: "number", // setting value - input type number
        TEXT: "text", // setting value - input type text
        CHECKBOX: "checkbox", // setting value - input type checkbox
        SCROLLBAR: "scrollbar" // setting value - scrollbar
    };

    // Fetch the DOM element (added to global to improve efficiency as we won't need to fetch it everytime while working with it)
    const SECTIONS_WRAPPER = document.querySelector("#sections-wrapper");
    const SETTINGS_WRAPPER = document.querySelector("#settings");

    // Track the active section
    let activeSection = SECTIONS.EDITOR; // Default active section

    // Store valid extension section IDs
    const validExtensionSections = new Map(); // Maps extensionSectionID to extensionID

    // Create extensions container to manage extension sections
    let extensionsContainer = null;

    /**
     * Creates a new section for an extension's settings
     * 
     * @param {String} extensionID - Unique identifier for the extension
     * @param {String} extensionName - Display name for the extension section
     * @returns {String} Unique section identifier for the extension
     */
    function createExtensionSection(extensionID, extensionName = "Extension Name") {
        // Generate a unique section ID
        const extensionSectionID = `${extensionID}-${crypto.randomUUID()}`;
        
        // Store the mapping for validation
        validExtensionSections.set(extensionSectionID, extensionID);

        // Create a container for the extension's settings
        const section = document.createElement("div");
        // section.className = "section extension-section";
        section.textContent = extensionName;
        section.dataset.extensionId = extensionID;
        section.dataset.sectionId = extensionSectionID;

        // Add click handler for section switching
        section.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering parent clicks
            switchSection(extensionSectionID);
        });

        // Add to extensions container
        if (extensionsContainer) {
            extensionsContainer.querySelector('.sub-sections').appendChild(section);
        }

        // Add the extension section heading
        _addSetting(extensionSectionID, SECTION_TYPES.HEADING1, extensionName);

        return extensionSectionID;
    }

    /**
     * Adds a setting to an extension section
     * 
     * @param {String} extensionSectionID - Section ID returned by createExtensionSection
     * @param {String} type - Setting type from SECTION_TYPES
     * @param {Object} config - Setting configuration
     */
    function addExtensionSetting(extensionSectionID, type, config) {
        // Validate that this is a legitimate extension section
        if (!validExtensionSections.has(extensionSectionID)) {
            console.error("Invalid extension section ID");
            return;
        }

        // Use the existing _addSetting function with the extension's section ID
        _addSetting(extensionSectionID, type, config);
    }

    /**
     * Creates the Extensions section with dropdown functionality
     * 
     * @private
     * @returns {HTMLElement} The created extensions section element
     */
    function _createExtensionsSection() {
        const section = document.createElement("div");
        section.className = "section has-sub-section";
        
        const menuName = document.createElement("div");
        menuName.className = "menu-item-name";
        menuName.textContent = SECTIONS.EXTENSIONS;

        const openSubMenu = document.createElement("div");
        openSubMenu.className = "open-sub-menu";
        
        // Right arrow SVG
        openSubMenu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="white"/>
        </svg>`;

        // Container for extension sub-sections
        const subSections = document.createElement("div");
        subSections.className = "sub-sections";
        subSections.style.display = "none";

        section.appendChild(menuName);
        section.appendChild(openSubMenu);
        section.appendChild(subSections);

        // Toggle sub-sections visibility
        section.addEventListener("click", (e) => {
            const isOpen = section.classList.contains("open");
            if (isOpen) {
                section.classList.remove("open");
                subSections.style.display = "none";
                // Change to right arrow
                openSubMenu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="white"/>
                </svg>`;
            } else {
                section.classList.add("open");
                subSections.style.display = "block";
                // Change to down arrow
                openSubMenu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill="white"/>
                </svg>`;
            }
        });

        return section;
    }

    function _addSetting(section, type, config) {
        if (!SETTINGS_WRAPPER) {
            console.error("Settings wrapper not found in the panel");
            return;
        }

        const settingContainer = document.createElement("div");
        settingContainer.className = "setting";
        settingContainer.dataset.section = section;

        // Handle headings differently as they don't need the full setting structure
        if (type === SECTION_TYPES.HEADING1) {
            if (typeof config !== "string") {
                console.error("If section type is a heading, then the config must be string");
                return;
            }
            const heading = document.createElement("h1");
            heading.textContent = config;
            settingContainer.appendChild(heading);
        } else {

            // TODO: some properties must be mandatorily present such as setting id, setting tite=ke, 

            // For all other types, create the standard setting structure
            // Setting Title
            const titleDiv = document.createElement("div");
            titleDiv.className = "setting-title";
            titleDiv.textContent = config.title;

            // Info icon if info is provided
            if (config.info) {
                const infoIcon = document.createElement("span");
                infoIcon.className = "info-icon";
                infoIcon.textContent = "i";
                infoIcon.title = config.info;
                titleDiv.appendChild(infoIcon);
            }

            // Setting Description
            const descDiv = document.createElement("div");
            descDiv.className = "setting-description";
            descDiv.textContent = config.description || "";

            // Setting Value container
            const valueDiv = document.createElement("div");
            valueDiv.className = "setting-value";

            // Create the appropriate input based on type
            let input;
            switch (type) {
                case SECTION_TYPES.DROPDOWN:
                    input = document.createElement("select");
                    config.options.forEach((option) => {
                        const optElement = document.createElement("option");
                        optElement.value = option;
                        optElement.textContent = option;
                        optElement.selected = option === config.defaultValue;
                        input.appendChild(optElement);
                    });
                    break;

                case SECTION_TYPES.NUMBER:
                    input = document.createElement("input");
                    input.type = "number";
                    input.value = config.defaultValue || 0;
                    break;

                case SECTION_TYPES.TEXT:
                    input = document.createElement("input");
                    input.type = "text";
                    input.value = config.defaultValue || "";
                    break;

                case SECTION_TYPES.CHECKBOX:
                    input = document.createElement("input");
                    input.type = "checkbox";
                    input.checked = config.defaultValue || false;
                    break;

                case SECTION_TYPES.SCROLLBAR:
                    input = document.createElement("input");
                    input.type = "range";
                    input.min = config.min || 0;
                    input.max = config.max || 100;
                    input.value = config.defaultValue || 0;
                    break;
            }

            if (input) {
                input.id = config.settingID;
                valueDiv.appendChild(input);
            }

            // Append all elements to the container
            settingContainer.appendChild(titleDiv);
            settingContainer.appendChild(descDiv);
            settingContainer.appendChild(valueDiv);
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

        if (sectionName === SECTIONS.EXTENSIONS) {
            extensionsContainer = _createExtensionsSection();
            SECTIONS_WRAPPER.appendChild(extensionsContainer);
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
            // Handle both main sections and extension sections
            if (!section.classList.contains('has-sub-section')) {
                const isExtensionSection = section.dataset.sectionId === newSection;
                const isMainSection = section.textContent === newSection;
                
                if (isExtensionSection || isMainSection) {
                    section.classList.add("active");
                } else {
                    section.classList.remove("active");
                }
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

        // dropdown input type example
        _addSetting(SECTIONS.EDITOR, SECTION_TYPES.DROPDOWN, {
            settingID: "editor.font_family",
            title: "Font Family",
            description: "Optional description to show below the title",
            info: "Optional description info on hover over an i icon",
            options: ["times new roman", "comic sans", "ariel"],
            defaultValue: "Ariel"
        });

        // number input type example
        _addSetting(SECTIONS.APPEARANCE, SECTION_TYPES.NUMBER, {
            settingID: "appearance.font_size",
            title: "Font Size",
            description: "Specify the font size in pixels",
            info: "Values between 8 and 72 are recommended",
            defaultValue: 14
        });

        // checkbox input type example
        _addSetting(SECTIONS.ADVANCED, SECTION_TYPES.CHECKBOX, {
            settingID: "advanced.word_wrap",
            title: "Word Wrap",
            description: "Enable word wrapping in the editor",
            defaultValue: true
        });
        
        // scroll bar example
        _addSetting(SECTIONS.APPEARANCE, SECTION_TYPES.SCROLLBAR, {
            settingID: "appearance.line_height",
            title: "Line Height",
            description: "Vertical space in between the lines",
            info: "Values between 1.2 and 1.8 are recommended",
            defaultValue: 1.5
        });
        
        // text input type example
        _addSetting(SECTIONS.EDITOR, SECTION_TYPES.TEXT, {
            settingID: "editor.themes",
            title: "Themes",
            description: "Choose a theme",
            defaultValue: "Phoenix Dark"
        });

        // Create a new extension section
        const sectionID = createExtensionSection("my-extension-id", "My Extension Name");

        // Add settings to the extension section
        addExtensionSetting(sectionID, SECTION_TYPES.CHECKBOX, {
            settingID: "my-extension.enabled",
            title: "Enable Feature",
            description: "Toggle this feature on/off",
            defaultValue: true
        });
        
    }

    _init();

    // Export the extension-related functions
    module.exports = {
        createExtensionSection,
        addExtensionSetting
    };
});
