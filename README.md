Caoutchouc
==========

Caoutchouc is set of common features (templating, DOM Utils) and a set of
asbtraction around browsers' extension APIs.

Usage
-----

Your extension must use Require.js, simply require init.js, then browser will be
detected and you will be able to use abstracted features trough the browser
class.

For example:

```
require(['caoutchouc/init'], function (coreInit) {
    require(['caoutchouc/browser'], function (browser) {
        var tabs = browser.get('tabs');

        tabs.open('https://www.google.com/');
    });
});
```

Features supported
------------------

| Feature        | Chrome/Opera | Firefox | Safari | Edge |
|----------------|--------------|---------|--------|------|
| DOM Parsing    |       ✓      |    ✓    |    ✓   |      |
| Hotkeys        |       ✓      |         |        |      |
| HTTP Client    |       ✓      |    ✓    |    ✓   |      |
| I18N           |       ✓      |    ✓    |    ✓   |      |
| Messaging      |       ✓      |    ✓    |    ✓   |      |
| Notifications  |       ✓      |    ✓    |    ✓   |      |
| Persistance    |       ✓      |    ✓    |    ✓   |      |
| Resources      |       ✓      |    ✓    |    ✓   |      |
| Windowing/Tabs |       ✓      |    ✓    |    ✓   |      |
