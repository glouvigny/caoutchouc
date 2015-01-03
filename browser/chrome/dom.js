define(function (require, exports, module) {
  var parser = new DOMParser();

  var Dom = {
    parse: function (string, type) {
        var doc = parser.parseFromString(string, type);

        return doc;
    },
  };

  module.exports = Dom;
});