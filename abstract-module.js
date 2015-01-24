define(function (require, exports, module) {
    var Persistance = require('./browser').get('persistance');

    var Abstract = function (router) {
        this.id = null;
        this.name = 'Unnamed module';
        this.icon = 'icon-block';

        this.disableable = false;
        this.enabled = false;
        this.router = router;
        this.context = {};
    };

    var keepRegisteredSettings = function (registered, loaded) {
        if (typeof registered !== 'object' || registered === null) {
            if (loaded !== undefined && (
                typeof loaded !== 'object' || loaded === null)
            ) {
                return loaded;
            }

            return registered;
        }

        var output = {};

        for (var i in registered) {
            if (registered.hasOwnProperty(i)) {
                var loaded_sub = undefined;

                if (loaded !== undefined) {
                    loaded_sub = loaded[i];
                }

                output[i] = keepRegisteredSettings(registered[i], loaded_sub);
            }
        }

        return output;
    };

    Abstract.prototype.loadSettings = function () {
        if (this.id === null || this.context.settings === undefined) {
            return;
        }

        Persistance.get('settings_' + this.id, this.context.settings)
            .then(function (settings) {
                settings = keepRegisteredSettings(this.context.settings,
                    settings);
                this.context.settings = settings;
            }.bind(this));
    };

    Abstract.prototype.saveSettings = function () {
        if (this.id === null || this.context.settings === undefined) {
            return;
        }

        Persistance.set('settings_' + this.id, this.context.settings);
    };

    module.exports = Abstract;
});