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
    NUMBER: "number", // add other types here
};

createMainSection(SECTIONS.EDITOR, "Editor - which is the section name translated");
createMainSection(SECTIONS.EXTENSIONS, "section name translated");


addSetting(SECTIONS.EDITOR, SECTION_TYPES.HEADING1, "Editor");
addSetting(SECTIONS.EDITOR, SECTION_TYPES.DROPDOWN, {
    settingID: "editor.font_family",
    title: "Font Family",
    description: "Optional description to show below the title",
    info: "Optional description info on hover over an i icon",
    options: ["times new roman", "comic sans", "ariel"],
    defaultValue: "ariel"
});

addSetting(SECTIONS.EDITOR, SECTION_TYPES.NUMBER, {
    settingID: "editor.font_size",
    title: "Font Size",
    description: "Optional description to show below the title",
    info: "Optional description info on hover over an i icon",
    defaultValue: 14
});

// the below is for extensions
function createExtensionSection(extensionID, extensionName = "extension Name to show to user"){
    //... implement here
    // the extensionName should be obtained from extension manager later given the extensionID
    // , but for initial dev, do it like this
    return extensionSectionID; // this should be a random generated unique ID like extensionid-crypto.randomUUID()
    // so that extensions cant spoof another extensions setting eazily. but this can be spoofed 
}

function addExtensionSetting(extensionSectionID /*, ...*/) {
    // behaves the same as addSetting but will only accept extensionSectionID returned by addExtensionSection
}

exports.createExtensionSection = createExtensionSection;
exports.addExtensionSetting = addExtensionSetting;