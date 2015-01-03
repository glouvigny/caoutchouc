define(function (require, exports, module) {
    var HttpResponse = function(status, body, headers) {
        this.status = status;
        this.body = body;
        this.headers = headers;
    };

    module.exports = HttpResponse;
});