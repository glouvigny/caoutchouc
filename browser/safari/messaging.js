define(function (require, exports, module) {
    var workers = [];
    var recvs = [];

    var undelivered = [];

    var Messaging = {
        send: function (options) {
            options.origin = 'background';

            console.log(['send', options]);
            var i;

            for (i in safari.application.browserWindows) {
                var browserWindow = safari.application.browserWindows[i];
                for (var j in browserWindow.tabs) {
                    var tab = browserWindow.tabs[j];

                    if (tab.page !== undefined) {
                        tab.page.dispatchMessage('message', options);
                    }
                }
            }

            for (i in safari.extension.popovers) {
                var popover = safari.extension.popovers[i];
                try {
                    if (popover &&
                        popover.contentWindow &&
                        popover.contentWindow.Messaging &&
                        popover.contentWindow.Messaging.recv) {
                        popover.contentWindow.Messaging.recv(options);
                    }
                } catch (e) {}
            }
        },

        recv: function (options, sender, cb) {
            options = options.message;

            if (typeof options !== 'object' || options.origin == 'background') {
                return false;
            }

            console.log(['recv', options]);

            if (recvs.length === 0) {
                undelivered.push(options);
            }

            for (var i = recvs.length - 1; i >= 0; i--) {
                var recv = recvs[i];
                recv(options);
            }
        },

        addRecv: function (recv) {
            if (recvs.length === 0) {
                for (var i in undelivered) {
                    if (undelivered.hasOwnProperty(i)) {
                        recv(undelivered[i]);
                    }
                }

                undelivered = [];
            }

            recvs.push(recv);
        },

        removeRecv: function (recv) {
            var pos = recvs.indexOf(recv);

            recvs.splice(pos, 1);
        }
    };

    safari.application.addEventListener("message", Messaging.recv, false);

    module.exports = Messaging;
});