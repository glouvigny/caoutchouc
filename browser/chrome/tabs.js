define(function (require, exports, module) {
    var Tabs = {
        open: function (url) {
            chrome.tabs.create({url: url});
        },
    };

    module.exports = Tabs;
});