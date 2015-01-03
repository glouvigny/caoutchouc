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

    module.exports = Hotkeys;
});