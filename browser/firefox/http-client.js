define(function (require, exports, module) {
  var Request = require('sdk/request').Request;
  var HttpResponse = require('../../http/response');
  var HttpUtils = require('../../http/utils');

  var HttpClient = {
      get: function (url, parameters, cb) {
          return Request({
            url: HttpUtils.buildUrl(url, parameters),
            onComplete: function (response) {
              return cb(new HttpResponse(
                  response.status,
                  response.text,
                  response.headers
              ));
            }
          }).get();
      },
  };

  module.exports = HttpClient;
});