define(function (require, exports, module) {
    var l10n = require("sdk/l10n");

    var I18n = {
        get: function (message) {
            return l10n.get(message);
        },
    };
  
  module.exports = I18n;
});
