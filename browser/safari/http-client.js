define(function (require, exports, module) {
    var HttpResponse = require('../../http/response');
    var HttpUtils = require('../../http/utils');

    var request = function (method, url, data) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            var params = null;
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4)
                    return;

                return resolve(new HttpResponse(
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
        });
    };


    var HttpClient = {
        get: function (url, parameters) {
            return request('GET', HttpUtils.buildUrl(url, parameters), {});
        },
        post: function (url, parameters) {
            return request('POST', url, parameters);
        },
    };

    module.exports = HttpClient;
});