define(function (require, exports, module) {
    var _ = require('./ext/lodash/dist/lodash');
    var Async = require('./browser').get('async');
    var Messaging = require('./browser').get('messaging');

    var Router = function () {
        this.modules = [];
        this.messaging = Messaging;

        this.messaging.addRecv(function (data) {
            this.dispatch(data);
        }.bind(this));
    };

    Router.prototype.registerModule = function (module) {
        this.modules.push(module);
    };

    Router.prototype.unregisterModule = function (module) {
        var pos = this.modules.indexOf(module);
        if (pos !== -1) {
            this.modules.splice(pos, 1);
        }
    };

    Router.prototype.dispatch = function (options) {
        var name = options.name;
        var routes = this.allRoutes()
            .filter(function (candidate_route) {
                return candidate_route[0] == name;
            })
            .map(function (route) {
                Async.defer(route[1].bind(route[2], options));
            });
    };

    Router.prototype.allRoutes = function() {
        var routes = [];

        for (var i in this.modules) {
            var module = this.modules[i];
            for (var j in this.modules[i].routes) {
                routes.push([j, module.routes[j], module]);
            }
        }

        return routes;
    };

    Router.prototype.sendResponse = function (options, elt, data) {
        options = _.cloneDeep(options);
        if (options.output === undefined) {
            options.output = {};
        }

        options.output[elt] = data;

        this.messaging.send(options);
    };

    module.exports = Router;
});