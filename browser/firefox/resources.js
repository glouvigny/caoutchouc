define(function (require, exports, module) {
    var self = require('sdk/self');

    var Resources = {
        load: function (file, cb) {
            return cb(self.data.load(file));
        },
        url: function (file, cb) {
            return cb(self.data.url(file));
        }
    };

    module.exports = Resources;
});