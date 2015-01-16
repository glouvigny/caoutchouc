define(function (require, exports, module) {
    var Persistance = {
        set: function (key, value) {
            var object = {};
            object[key] = value;

            return new Promise(function (resolve, reject) {
                return chrome.storage.local.set(object, function () {
                    return resolve(true);
                });
            });
        },

        get: function (key, default_value) {
            return new Promise(function (resolve, reject) {
                return chrome.storage.local.get(key, function (value) {
                    if (typeof value !== 'object' || value === null) {
                        value = {};
                    }

                    if (chrome.runtime.lastError || value[key] === undefined) {
                        value[key] = default_value;
                    }

                    return resolve(value[key]);
                });
            });
        }
    };

    module.exports = Persistance;
});