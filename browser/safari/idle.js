define(function (require, exports, module) {
    var subscribed = [];
    var enabled = false;

    var handler = function (state) {
        for (var i in subscribed) {
            subscribed[i](state);
        }
    };

    var Idle = {
        register: function (func) {
            subscribed.push(func);

            if (enabled === false) {
                enabled = true;
                // todo
            }
        },

        unregister: function (func) {
            var index = subscribed.indexOf(func);

            if (index > -1) {
                subscribed.splice(index, 1);
                return true;
            }

            return false;
        }
    };

    module.exports = Idle;
});