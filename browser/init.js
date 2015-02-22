var isChrome = false;
var isFirefox = false;
var isSafari = false;

try {
    if (chrome !== undefined && chrome.i18n !== undefined) {
        isChrome = true;
    }
} catch (e) {}

try {
    if (safari !== undefined && safari.self !== undefined) {
        isSafari = true;
    }
} catch (e) {}

isFirefox = !isChrome && !isSafari;

define(function (require, exports, module) {
    if (isChrome) {
        require(['./chrome/init'], function (browser) {});
    } else if (isSafari) {
        require(['./safari/init'], function (browser) {});
    }
});

if (isFirefox) {
    require('./firefox/init');
}
