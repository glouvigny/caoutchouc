define(function (require, exports, module) {
    var Chrome = require("chrome");
    var Cc = Chrome.Cc;
    var Ci = Chrome.Ci;
    var parser = Cc["@mozilla.org/xmlextras/domparser;1"]
        .createInstance(Ci.nsIDOMParser);

    var Dom = {
        parse: function (string, type) {
            var doc = parser.parseFromString(string, type);

            return doc;
        },
    };

  module.exports = Dom;
});