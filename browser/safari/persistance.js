define(function (require, exports, module) {
    var Persistance = {
        set: function (key, value) {
            localStorage[key] = JSON.stringify(value);

            return Promise.resolve(true);
        },
        get: function (key, default_value) {
            try {
                var value = localStorage[key];

                if (value === undefined) {
                    value = default_value;
                }

                value = JSON.parse(value);

                return Promise.resolve(value);
            } catch (e) {
                return Promise.resolve(default_value);
            }
        }
    };

    module.exports = Persistance;
});