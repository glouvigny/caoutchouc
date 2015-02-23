define(function (require, exports, module) {
    var strings = {};

    // blocking requests all the way
    var xhr = new XMLHttpRequest();
    var url = safari.extension.baseURI + 'data/manifest-extras.json';
    xhr.open('GET', url, false);
    xhr.send(null);

    var manifest = JSON.parse(xhr.responseText);
    try {
        if (manifest.default_locale) {
            url = safari.extension.baseURI + '_locales/' +
                manifest.default_locale + '/messages.json';
            xhr.open('GET', url, false);
            xhr.send(null);

            strings = JSON.parse(xhr.responseText);

            var userLocale = window.navigator.language.substr(0, 2);

            if (userLocale !== manifest.default_locale &&
                manifest.available_locales.indexOf(userLocale) !== -1) {
                url = safari.extension.baseURI + '_locales/' + userLocale +
                    '/messages.json';
                xhr.open('GET', url, false);
                xhr.send(null);

                var userStrings = JSON.parse(xhr.responseText);
                for (var i in userStrings) {
                    strings[i] = userStrings[i];
                }
            }

        }
    } catch (e) {}

    var I18n = {
        get: function (message) {
            if (strings[message] !== undefined) {
                return strings[message].message;
            }

            return message;
        },
    };

  module.exports = I18n;
});
