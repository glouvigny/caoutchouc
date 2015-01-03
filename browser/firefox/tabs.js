define(function (require, exports, module) {
    var tabs = require("sdk/tabs");

    var Tabs = {
        open: function (url) {
            tabs.open(url);
        },
    };

    module.exports = Tabs;
});