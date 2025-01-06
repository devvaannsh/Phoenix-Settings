define(function (require, exports, module) {
    "use strict";

    /**
     * @private
     * Validates if the provided menu item exists in the panel
     *
     * @param {String} menuItem | Name of the menu item to validate
     * @returns {Boolean} | whether the menu item exists or not
     */
    function _doesMenuItemExist(menuItem) {
        const menuItems = document.querySelectorAll(".menu-item");
        return Array.from(menuItems).some(
            (item) =>
                item.textContent.trim() === menuItem ||
                item.querySelector(".menu-item-name")?.textContent.trim() === menuItem
        );
    }

    /**
     * @private
     * Creates the basic structure for a setting i.e.
     * the setting title and the setting description
     *
     * @param {String} title - Setting title
     * @param {String} description - Setting description
     * @returns {HTMLElement} - The setting container
     */
    function _createSettingStructure(title, description) {
        const setting = document.createElement("div");
        setting.className = "setting";

        const titleDiv = document.createElement("div");
        titleDiv.className = "setting-title";
        titleDiv.textContent = title;

        const descDiv = document.createElement("div");
        descDiv.className = "setting-description";
        descDiv.textContent = description;

        setting.appendChild(titleDiv);
        setting.appendChild(descDiv);

        return setting;
    }

    /**
     * @private
     * Creates the appropriate input element based on the setting type
     *
     * @param {String} type - Type of setting value
     * @param {Array|Boolean} values - Possible values for the setting
     * @param {*} defaultValue - Default value for the setting
     * @returns {HTMLElement} - The input element
     */
    function _createSettingValueElement(type, values, defaultValue) {
        const valueContainer = document.createElement("div");
        valueContainer.className = "setting-value";

        let inputElement;

        // to identify the type of the setting and create a element for that
        switch (type.toLowerCase()) {
            case "large-input-box":
                inputElement = document.createElement("input");
                inputElement.type = "text";
                valueContainer.classList.add("large-input");
                break;

            case "input-box":
                inputElement = document.createElement("input");
                inputElement.type = "text";
                valueContainer.classList.add("medium-input");
                break;

            case "small-input-box":
                inputElement = document.createElement("input");
                inputElement.type = "text";
                valueContainer.classList.add("small-input");
                break;

            case "number":
                inputElement = document.createElement("input");
                inputElement.type = "number";
                inputElement.addEventListener('keydown', (e) => {
                    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                    }
                });
                valueContainer.classList.add("number-input");
                break;

            case "dropdown":
                inputElement = document.createElement("select");
                values.forEach((value) => {
                    const option = document.createElement("option");
                    option.value = value;
                    option.textContent = value;
                    option.selected = value === defaultValue;
                    inputElement.appendChild(option);
                    valueContainer.classList.add("dropdown");
                });
                break;

            case "checkbox":
                inputElement = document.createElement("input");
                inputElement.type = "checkbox";
                inputElement.checked = defaultValue || false;
                valueContainer.classList.add("checkbox");
                break;

            case "scroll-bar":
                inputElement = document.createElement("input");
                inputElement.type = "range";
                inputElement.min = values[0];
                inputElement.max = values[1];
                inputElement.step = values[2];
                inputElement.value = defaultValue || values[0];
                valueContainer.classList.add("scroll-bar");
                break;

            default:
                throw new Error(`Unsupported setting type: ${type}`);
        }

        if (defaultValue && (type.toLowerCase().includes("input-box") || type.toLowerCase() === "number")) {
            inputElement.value = defaultValue;
        }

        valueContainer.appendChild(inputElement);
        return valueContainer;
    }

    /**
     * [Public API]
     * Adds a setting to a specific menu item.
     * The setting will have a title, a description and a setting type.
     *
     * @param {String} menuItem | The menu item to add the setting to (case-sensitive)
     * @param {String} settingTitle | Title of the setting
     * @param {String} settingDescription | Description of the setting
     * @param {Array} settingConfig | [settingType, values]
     *    settingType: one of ["large-input-box", "input-box", "small-input-box", "number", "dropdown", "checkbox", "scroll-bar"]
     *    values: array of values for dropdown (must be atleast 2), or [start, end, step] for scroll-bar, or boolean for checkbox
     * @param {*} [defaultValue] - Optional default value for the setting
     * @param {Number} [index] - Optional position to insert the setting
     * @returns {HTMLElement} - The created setting element
     */
    function addSetting(menuItem, settingTitle, settingDescription, settingConfig, defaultValue, index) {
        if (!menuItem || !settingTitle || !settingDescription || !settingConfig) {
            throw new Error("Required parameters missing");
        }

        if (!Array.isArray(settingConfig) || settingConfig.length < 2) {
            throw new Error("settingConfig must be an array with at least type and values");
        }

        if (!_doesMenuItemExist(menuItem)) {
            throw new Error(`Menu item '${menuItem}' does not exist`);
        }

        const [settingType, values] = settingConfig;
        const settingElement = _createSettingStructure(settingTitle, settingDescription);
        const valueElement = _createSettingValueElement(settingType, values, defaultValue);
        settingElement.appendChild(valueElement);

        const settingsContainer = document.querySelector(".settings");

        if (typeof index === "number" && index >= 0) {
            const existingSettings = settingsContainer.children;
            if (index < existingSettings.length) {
                settingsContainer.insertBefore(settingElement, existingSettings[index]);
            } else {
                settingsContainer.appendChild(settingElement);
            }
        } else {
            settingsContainer.appendChild(settingElement);
        }

        return settingElement;
    }

    module.exports = {
        addSetting
    };
});