define(function (require, exports, module) {
    var HttpUtils = {};

    HttpUtils.serializeArgs = function (obj) {
        if (typeof obj !== 'object' || obj === null) {
            obj = {};
        }

        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' +
                    encodeURIComponent(obj[p]));
            }
        }

        return str.join('&');
    };

    HttpUtils.buildUrl = function (url, obj) {
        var args = HttpUtils.serializeArgs(obj);

        if (args.length === 0) {
            return url;
        }

        return url + '?' + args;
    };

    module.exports = HttpUtils;
});