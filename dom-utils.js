define(function (require, exports, module) {
    var Dom = require('./browser').get('dom');

    var DomUtils = {};

    var regexpNewlineTabs = /\n([ \t]*\n)+/g;
    var regexpNewline = /\n/g;
    var regexpHttpOrS = /https?:\/\//;
    var regexpProtocolLess = /\/\//g;

    DomUtils.removeScripts = function (dom) {
        var scripts = dom.querySelectorAll('script');

        for (var i in scripts) {
            scripts[i].textContent = '';
        }

        return dom;
    };

    DomUtils.keepTextOnly = function (dom, convertBr) {
        var brs = dom.querySelectorAll('br');

        if (convertBr === true) {
            for (var i in brs) {
                brs[i].textContent = '\n';
            }
        }

        var html = dom.textContent
            .replace(regexpNewlineTabs, '</p><p>')
            .replace(regexpNewline, '<br />') + '</p>';

        return Dom.parse(html, 'text/html');
    };

    DomUtils.absoluteLinks = function (doc, scheme) {
        [
            doc.querySelectorAll("*[src*='//']"),
            doc.querySelectorAll("*[srcset*='//']"),
            doc.querySelectorAll("*[href*='//']"),
        ].map(function (elts) {
            for (var i in elts) {
                if (!elts.hasOwnProperty(i)) {
                    continue;
                }

                var elt = elts[i];
                for (var j in elt.attributes) {
                    if (!elt.attributes.hasOwnProperty(j)) {
                        continue;
                    }

                    var attr = elt.attributes[j];

                    if (attr.value &&
                        !attr.value.match(regexpHttpOrS) &&
                        attr.value.match(regexpProtocolLess)) {
                        attr.value = attr.value.replace(regexpProtocolLess,
                            scheme);
                    }
                }
            }
        });

        return doc;

    };

    DomUtils.newWindowLinks = function (doc) {
        var elts = doc.querySelectorAll("a[href]");

        for (var i in elts) {
            if (!elts.hasOwnProperty(i)) {
                continue;
            }

            var elt = elts[i];

            if (elt.getAttribute &&
                elt.getAttribute('href')[0] != '#') {
                elt.setAttribute('target', '_blank');
            }
        }

        return doc;
    };

    module.exports = DomUtils;
});