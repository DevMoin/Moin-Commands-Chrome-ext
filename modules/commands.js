// appSetup.js

let sufiCommands = {
    "Basic": {},
    "Get Info": {}
};

/**
 * Add new command.
 * @param {string} name - Name or title of the command.
 * @param {function(config)} fn - The function to execute when the command is called.
 * @param {string} group - The function to execute when the command is called.
 * @typedef {Object} config
 * @property {function} reOpenMain - Description of kotak property.
 */
export function addCommand(name, fn, group='Basic') {
    if(!sufiCommands[group])
    {
        sufiCommands[group] = {};
    }
    sufiCommands[group][name] = {
        title: name,
        fn: fn,
    };
}
export { sufiCommands };