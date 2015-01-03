define(function (require, exports, module) {
    var Browser = require('../browser');

    Browser
        .set('http-client', require('./http-client'))
        .set('messaging', require('./messaging'))
        .set('persistance', require('./persistance'))
        .set('resources', require('./resources'))
        .set('async', require('./async'))
        .set('notifications', require('./notifications'))
        .set('dom', require('./dom'))
        .set('i18n', require('./i18n'))
        .set('hotkeys', require('./hotkeys'))
        .set('tabs', require('./tabs'))
    ;

    require('./manifest');

    module.exports = Browser;
});