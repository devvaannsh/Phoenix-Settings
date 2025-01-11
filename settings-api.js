define(function (require, exports, module) {
    "use strict";

    let panelHTML = require("text!htmlContent/main.html");

    // core internal APIs only
    const SECTIONS = {
        EDITOR: "editor",
        EXTENSIONS: "extensions"
    };

    const SECTION_TYPES = {
        HEADING1: "heading1",
        HEADING2: "heading2",
        PARAGRAPH: "paragraph",
        DROPDOWN: "dropdown",
        NUMBER: "number"
    };

    // Import HTML content
    //let panelHTML = require("text!html/main.html");

    function createMainSection(sectionName) {
        console.log("--------------------");
        console.log("panel html");
        console.log(panelHTML);
        console.log("--------------------");
        console.log("--------------------");

        console.log("--------------------");
        console.log("document");
        console.log(document);
        console.log("--------------------");
        console.log("--------------------");

        // Create a temporary container to parse the HTML string
        //const tempContainer = document.createElement("div");
        //tempContainer.innerHTML = panelHTML;
        //
        const menusWrapper = document.getElementById("menus-wrapper");
        ////
        console.log("--------------------");
        console.log("menus wrapper");
        console.log(menusWrapper);
        console.log("--------------------");
        console.log("--------------------");
        ////
        //if (!menusWrapper) {
        //    console.error("Menus wrapper not found in the panel");
        //    return;
        //}
        ////
        //// Create the new menu item
        //const menuItem = document.createElement("div");
        //menuItem.className = "menu-item";
        //menuItem.textContent = sectionName;
        //
        //menusWrapper.appendChild(menuItem);

        // add the click event listener to listen for clicks on this menu item
        //menuItem.addEventListener("click", function () {
        //    _handleMenuItemClick(this);
        //});

        // get the existing menu items to get the last valid index
        //const existingItems = menusWrapper.getElementsByClassName("menu-item");

        // Validate and handle index
        //if (index !== undefined) {
        //    // make sure the index is a number and within the valid range.
        //    if (typeof index === "number" && Number.isInteger(index) && index > 0 && index <= existingItems.length + 1) {
        //        // insert the new menu item at the specified index
        //        const referenceNode = existingItems[index - 1] || null;
        //        menusWrapper.insertBefore(menuItem, referenceNode);
        //    } else {
        //        // if the index is invalid, add to the last
        //        menusWrapper.appendChild(menuItem);
        //    }
        //} else {
        //    // index not provided, add to the last
        //    menusWrapper.appendChild(menuItem);
        //}

        // If this is the first menu item added, make it active
        //if (existingItems.length === 0) {
        //    menuItem.classList.add("active");
        //}

        //return menuItem;
    }

    createMainSection(SECTIONS.EDITOR);
    createMainSection(SECTIONS.EXTENSIONS);

    //createMainSection(SECTIONS.EDITOR, "Editor - which is the section name translated");
    //createMainSection(SECTIONS.EXTENSIONS, "section name translated");

    //addSetting(SECTIONS.EDITOR, SECTION_TYPES.HEADING1, "Editor");
    //addSetting(SECTIONS.EDITOR, SECTION_TYPES.DROPDOWN, {
    //    settingID: "editor.font_family",
    //    title: "Font Family",
    //    description: "Optional description to show below the title",
    //    info: "Optional description info on hover over an i icon",
    //    options: ["times new roman", "comic sans", "ariel"],
    //    defaultValue: "ariel"
    //});
    //
    //addSetting(SECTIONS.EDITOR, SECTION_TYPES.NUMBER, {
    //    settingID: "editor.font_size",
    //    title: "Font Size",
    //    description: "Optional description to show below the title",
    //    info: "Optional description info on hover over an i icon",
    //    defaultValue: 14
    //});
    //
    //// the below is for extensions
    //function createExtensionSection(extensionID, extensionName = "extension Name to show to user") {
    //    //... implement here
    //    // the extensionName should be obtained from extension manager later given the extensionID
    //    // , but for initial dev, do it like this
    //    return extensionSectionID; // this should be a random generated unique ID like extensionid-crypto.randomUUID()
    //    // so that extensions cant spoof another extensions setting eazily. but this can be spoofed
    //}
    //
    //function addExtensionSetting(extensionSectionID /*, ...*/) {
    //    // behaves the same as addSetting but will only accept extensionSectionID returned by addExtensionSection
    //}
    //
    //exports.createExtensionSection = createExtensionSection;
    //exports.addExtensionSetting = addExtensionSetting;
});
