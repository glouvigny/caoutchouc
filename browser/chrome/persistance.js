define(function (require, exports, module) {
    var Persistance = {
        set: function (key, value, cb) {
            if (cb === undefined) {
                cb = function () {};
            }

            var object = {};
            object[key] = value;

            return chrome.storage.local.set(object, function () {
                return cb(true);
            });
        },

        get: function (key, default_value, cb) {
            return chrome.storage.local.get(key, function (value) {
                if (typeof value !== 'object' || value === null) {
                    value = {};
                }

                if (chrome.runtime.lastError || value[key] === undefined) {
                    value[key] = default_value;
                }

                return cb(value[key]);
            });
        }
    };

    module.exports = Persistance;
});