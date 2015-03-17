define(function (require, exports, module) {
    var notificationActions = {};

    var Notifications = {
        send: function (id, title, subtext, image, actions, cb) {
            var options = {};
            options.type = 'basic';

            if (!(actions instanceof Array)) {
                actions = [];
            }

            if (image) {
                options.iconUrl = image;
            }

            if (!cb) {
                cb = function () {};
            }

            options.title = title;
            options.message = subtext;
            options.eventTime = Date.now();
            options.buttons = actions.map(function (button) {
                return {'title': button.title};
            });

            return chrome.notifications.create(id, options, function (id) {
                if (typeof notificationActions[id] === 'undefined') {
                    chrome.notifications.onButtonClicked.addListener(function (
                        nId, btnId
                    ) {
                        if (nId !== id) {
                            return;
                        }

                        if (notificationActions[id][btnId] !== undefined) {
                            return notificationActions[id][btnId].cb();
                        }
                    });
                }

                notificationActions[id] = actions;

                return cb(id);
            });
        },
        hide: function (id, cb) {
            if (!cb) {
                cb = function () {};
            }

            chrome.notifications.clear(id, cb);
        },
    };

    module.exports = Notifications;
});