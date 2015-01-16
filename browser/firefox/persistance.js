define(function (require, exports, module) {
    var ss = require('sdk/simple-storage');

    var Persistance = {
        set: function (key, value) {
            ss.storage[key] = value;

            return Promise.resolve(true);
        },
        get: function (key, default_value) {
            var value = ss.storage[key];

            if (value === undefined) {
                value = default_value;
            }

            return Promise.resolve(value);
        }
    };

    module.exports = Persistance;
});