define(function (require, exports, module) {
    var Browser = require('../../browser');

    Browser
        .set('name', 'safari')
        .set('http-client', require('./http-client'))
        .set('messaging', require('./messaging'))
        .set('persistance', require('./persistance'))
        .set('resources', require('./resources'))
        .set('async', require('./async'))
        .set('notifications', require('./notifications'))
        .set('dom', require('./dom'))
        .set('i18n', require('./i18n'))
        .set('hotkeys', require('./hotkeys'))
        .set('idle', require('./idle'))
        .set('tabs', require('./tabs'))
    ;

    module.exports = Browser;
});