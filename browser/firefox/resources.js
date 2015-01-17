define(function (require, exports, module) {
    var self = require('sdk/self');

    var Resources = {
        load: function (file) {
            return Promise.resolve(self.data.load(file));
        },
        url: function (file) {
            return Promise.resolve(self.data.url(file));
        }
    };

    module.exports = Resources;
});