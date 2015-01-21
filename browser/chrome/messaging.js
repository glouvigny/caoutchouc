define(function (require, exports, module) {
    var workers = [];
    var recvs = [];

    var undelivered = [];

    var Messaging = {
        send: function (options) {
            options.origin = 'background';

            chrome.runtime.sendMessage(options);
            chrome.tabs.query({}, function(tabs) {
                for (var i in tabs) {
                    if (tabs.hasOwnProperty(i)) {
                        var tab = tabs[i];

                        chrome.tabs.sendMessage(tab.id, options);
                    }
                }
            });
        },

        recv: function (options, sender, cb) {
            if (typeof options !== 'object' || options.origin == 'background') {
                return false;
            }

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

    chrome.runtime.onMessage.addListener(Messaging.recv);

    module.exports = Messaging;
});