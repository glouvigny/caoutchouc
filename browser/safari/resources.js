define(function (require, exports, module) {
    var Resources = {
        load: function (file) {
            return new Promise(function (resolve, reject) {
                return Resources.url(file)
                    .then(function (url) {
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState != 4)
                                return;

                            return resolve(xhr.responseText);
                        };

                        xhr.open('GET', url, true);
                        return xhr.send(null);
                    });
            });
        },

        url: function (file) {
            var url = safari.extension.baseURI + 'data/' + file;

            return Promise.resolve(url);
        }
    };

    module.exports = Resources;
});