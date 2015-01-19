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

    Abstract.prototype.loadSettings = function () {
        if (this.id === null || this.context.settings === undefined) {
            return;
        }

        Persistance.get('settings_' + this.id, this.context.settings)
            .then(function (settings) {
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