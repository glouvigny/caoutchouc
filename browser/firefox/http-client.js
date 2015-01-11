define(function (require, exports, module) {
    var Request = require('sdk/request').Request;
    var HttpResponse = require('../../http/response');

    var request = function (method, url, parameters) {
        if (parameters === undefined) {
            parameters = {};
        }

        return new Promise(function(resolve, reject) {
            return Request({
                url: url,
                content: parameters,
                onComplete: function (response) {
                    return resolve(new HttpResponse(
                        response.status,
                        response.text,
                        response.headers
                    ));
                }
            })[method]();
        });
    };


    var HttpClient = {
        get: request.bind(null, 'get'),
        post: request.bind(null, 'post'),
    };

  module.exports = HttpClient;
});