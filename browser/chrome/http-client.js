define(function (require, exports, module) {
    var HttpResponse = require('../../http/response');
    var HttpUtils = require('../../http/utils');

    var HttpClient = {
        request: function (method, url, data, cb) {
            var xhr = new XMLHttpRequest();
            var params = null;
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4)
                    return;

                return cb(new HttpResponse(
                    xhr.status,
                    xhr.responseText,
                    xhr.getAllResponseHeaders()
                ));
            };

            xhr.open(method, url, true);

            if (method === 'POST') {
                params = HttpUtils.serializeArgs(data);
                xhr.setRequestHeader('Content-type',
                    'application/x-www-form-urlencoded');
            }
            
            return xhr.send(params);
        },
        get: function (url, parameters, cb) {
            return HttpClient.request('GET',
                HttpUtils.buildUrl(url, parameters), {}, cb);
        },
        post: function (url, parameters, cb) {
            return HttpClient.request('POST', url, parameters, cb);
        },
    };

    module.exports = HttpClient;
});