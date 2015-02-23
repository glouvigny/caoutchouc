define(function (require, exports, module) {
    var Persistance = {
        set: function (key, value) {
            localStorage[key] = value;

            return Promise.resolve(true);
        },
        get: function (key, default_value) {
            var value = localStorage[key];

            if (value === undefined) {
                value = default_value;
            }

            return Promise.resolve(value);
        }
    };

    module.exports = Persistance;
});