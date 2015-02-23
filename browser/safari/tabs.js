define(function (require, exports, module) {
    var Tabs = {
        open: function (url) {
            safari.application.activeBrowserWindow.openTab(url);
        },
    };

    module.exports = Tabs;
});