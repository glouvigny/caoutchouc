define(function (require, exports, module) {
    var notifications = require("sdk/notifications");

    var Notifications = {
        send: function (id, title, subtext, image, actions, cb) {
            notifications.notify({
                title: title,
                text: subtext,
                iconURL: image
            });
        },
        hide: function (id, cb) {
        },
    };

    module.exports = Notifications;
});