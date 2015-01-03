define(function (require, exports, module) {
    var setTimeout = require('sdk/timers').setTimeout;

    var Async = {
        defer: function (fun, after) {
            if (after === undefined) {
                after = 0;
            }

            setTimeout(fun, after);
        },
    };

    module.exports = Async;
});