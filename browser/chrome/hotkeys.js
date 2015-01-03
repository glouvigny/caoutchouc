define(function (require, exports, module) {
    var cmds = {};

    var Hotkeys = {
        register: function (name, cb) {
            cmds[name] = cb;
        },
        unregister: function (name) {
            delete cmds[name];

            return true;
        },
    };

    chrome.commands.onCommand.addListener(function (cmd) {
        if (cmds[cmd] !== undefined) {
            cmds[cmd]();
        }
    });

    module.exports = Hotkeys;
});