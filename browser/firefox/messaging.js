define(function (require, exports, module) {
    /* jshint moz: true */

    var workers = [];
    var recvs = [];

    var Messaging = {
        send: function (options) {
            console.log('SENDING');
            console.log(options);

            for each (var worker in workers) {
                worker.port.emit('message', options);
            }
        },

        recv: function (options) {
            console.log('RECEIVING');
            console.log(options);

            for each (var recv in recvs) {
                recv(options);
            }
        },

        addRecv: function (recv) {
            recvs.push(recv);
        },

        removeRecv: function (recv) {
            var pos = recvs.indexOf(recv);

            recvs.splice(pos, 1);
        },

        // Not in "contract"
        attach: function (worker) {
            workers.push(worker);

            worker.on('detach', function () {
                Messaging.detach(worker);
            });
            worker.port.on('message', Messaging.recv);
        },

        detach: function (worker) {
            var pos = workers.indexOf(worker);

            if (pos !== -1) {
                workers.splice(pos, 1);
            }
        },
    };

    module.exports = Messaging;
});