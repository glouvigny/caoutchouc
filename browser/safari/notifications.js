define(function (require, exports, module) {
    var Notifications = {
        send: function (title, subtext, image, actions, cb) {
            // TODO
        },
        hide: function (id, cb) {
            if (!cb) {
                cb = function () {};
            }

            // TODO
        },
    };

    module.exports = Notifications;
});