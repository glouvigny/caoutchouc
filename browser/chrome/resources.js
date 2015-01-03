define(function (require, exports, module) {
    var Resources = {
        load: function (file, cb) {
            return Resources.url(file, function (url) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState != 4)
                        return;

                    return cb(xhr.responseText);
                };

                xhr.open('GET', url, true);
                return xhr.send(null);
            });
        },

        url: function (file, cb) {
            var url = chrome.extension.getURL('data/' + file);

            return cb(url);
        }
    };

    module.exports = Resources;
});