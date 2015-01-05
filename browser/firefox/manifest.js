define(function (require, exports, module) {
    var ToggleButton = require('sdk/ui/button/toggle').ToggleButton;
    var panels = require('sdk/panel');
    var self = require('sdk/self');
    var pageMod = require('sdk/page-mod');

    var Messaging = require('../../browser').get('messaging');

    var manifest = JSON.parse(self.data.load('manifest.json'));

    var relativeToData = function (path) {
        return self.data.url(path.replace(/^data\//, ''));
    };

    var convertMatchingRule = function (matching_rule) {
        return matching_rule
            .replace(/^(\*|https?)\:\/\//, '')
            .replace(/\/.*/g, '');
    };

    if (manifest.browser_action !== undefined) {
        var path = relativeToData(manifest.browser_action.default_popup);
        var popupContentScripts = manifest.browser_action.scripts
            .map(relativeToData);

        var handleHide = function () {
            button.state('window', {checked: false});
        };

        var panel = panels.Panel({
            contentURL: self.data.url(path),
            onHide: handleHide,
            contentScriptFile: popupContentScripts
        });

        panel.resize(manifest.browser_action.width,
            manifest.browser_action.height);

        Messaging.attach(panel);

        var handleChange = function (state) {
            if (state.checked) {
                panel.show({
                    position: button
                });
            }
        };

        var button = ToggleButton({
            id: self.id.replace(/(@|\.)/g, '') + '-action-button',
            label: self.name,
            icon: {
                '32': relativeToData(manifest.browser_action.default_icon),
            },
            onClick: handleChange
        });
    }

    if (manifest.content_scripts !== undefined) {
        for (var i in manifest.content_scripts) {
            var contentScripts = manifest.content_scripts[i].js
                .map(relativeToData);

            for (var j in manifest.content_scripts[i].matches) {
                var matches = convertMatchingRule(
                    manifest.content_scripts[i].matches[j]
                );
            
                pageMod.PageMod({
                    include: matches,
                    attachTo: ['existing', 'top'],
                    contentScriptFile: contentScripts,
                    onAttach: Messaging.attach,
                });
            }
        }
    }
});