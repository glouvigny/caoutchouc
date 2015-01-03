define(function (require, exports, module) {
    var ss = require('sdk/simple-storage');

    var Persistance = {
        set: function (key, value, cb) {
            if (cb === undefined) {
                cb = function () {};
            }

            ss.storage[key] = value;

            return cb(true);
        },
        get: function (key, default_value, cb) {
            var value = ss.storage[key];

            if (value === undefined) {
                value = default_value;
            }

            return cb(value);
        }
    };

    module.exports = Persistance;
});