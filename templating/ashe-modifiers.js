/**
 * List of Ashe modifiers.
 */
define(function (require, exports, module) {
    var Ashe = require('../ext/ashe/ashe');
    var Browser = require('../browser');

    Ashe.addModifiers({
        trans: function (str, args) {
            var translated = Browser.get('i18n').get(str);
            if (!translated) {
                return str;
            }

            return translated;
        },

        eq: function (a, b) {
            return a == b;
        },

        _if: function (test, _true, _false) {
            return test ? _true : _false;
        },

        duration: function (length) {
            var min = parseInt(length / 60, 10);
            var sec = length % 60;

            return '' + (min < 10 ? '0' : '') + min +
                ':' + (sec < 10 ? '0' : '') + sec;
        },
    });
});