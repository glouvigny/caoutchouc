define(function (require, exports, module) {
    var Browser = {
    };

    var set = function (key, value) {
        Browser[key] = value;

        return this;
    };

    var get = function (key) {
        return Browser[key];
    };

    module.exports = {
        set: set,
        get: get
    };
});