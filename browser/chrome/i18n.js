define(function (require, exports, module) {
  var I18n = {
    get: function (message) {
        return chrome.i18n.getMessage(message);
    },
  };

  module.exports = I18n;
});
