define(function (require, exports, module) {
    var Ashe = require('./ext/ashe/ashe');
    var Resources = require('./browser').get('resources');

    var Templating = {
        templates: {},

        render: function (template, vars) {
            return Templating.loadTemplate(template)
                .then(function (tpl) {
                    var rendered = Ashe.parse(tpl, vars);

                    return Promise.resolve(rendered);
                });
        },

        loadTemplate: function (file) {
            if (Templating.templates[file] !== undefined) {
                return Promise.resolve(Templating.templates[file]);
            }

            return Resources.load(file)
                .then(function (template) {
                    var tpl = template;

                    Templating.templates[file] = tpl;

                    return Promise.resolve(tpl);
                });
        },
    };

    module.exports = Templating;
});