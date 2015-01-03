try {
    if (chrome !== undefined && chrome.i18n !== undefined) {
        define(function (require, exports, module) {
            // Init Chrome browser APIs
            require(['./chrome/init'], function (browser) {});
        });
    }
} catch (e) {
    require('./firefox/init');
}
