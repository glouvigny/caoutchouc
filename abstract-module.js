define(function (require, exports, module) {
    var Abstract = function (router) {
        this.name = 'Unnamed module';
        this.icon = 'icon-block';

        this.disableable = false;
        this.enabled = false;
        this.router = router;
    };

    module.exports = Abstract;
});