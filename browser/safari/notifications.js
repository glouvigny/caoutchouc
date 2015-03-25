define(function (require, exports, module) {
    var Notifications = {
        send: function (id, title, subtext, image, actions, cb) {
            var n = new Notification(title, {
              'body': subtext.replace(/\n/g, ' ― '),
            });

            n.onclick = function () {
                this.close();
            };

            return cb(n);
        },
        hide: function (n, cb) {
            if (!cb) {
                cb = function () {};
            }

            n.close();
        },
    };

    module.exports = Notifications;
});