define(function (require, exports, module) {
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