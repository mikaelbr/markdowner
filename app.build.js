({
    baseUrl: "public",
    paths: {
        order: 'js/libs/requirejs-plugins/order',
        vent: 'js/vent',
        templates: 'templates',
        bootstrap: 'js/vendor/bootstrap/docs/assets/js/bootstrap'
    },
     "packages": [
        {
            "name": "ace",
            "location": "js/vendor/ace",
            "main": "ace.js"
        },
        {
            "name": "backbone",
            "location": "js/vendor/backbone",
            "main": "backbone.js"
        },
        {
            "name": "bootstrap",
            "location": "js/vendor/bootstrap"
        },
        {
            "name": "jquery",
            "location": "js/vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "marked",
            "location": "js/vendor/marked",
            "main": "./lib/marked.js"
        },
        {
            "name": "keymaster",
            "location": "js/vendor/keymaster",
            "main": "keymaster.js"
        },
        {
            "name": "text",
            "location": "js/vendor/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "js/vendor/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "keymaster": {
            "exports": "key"
        },
        "underscore": {
            "exports": "_"
        },
        'bootstrap': {
          deps: ['jquery']
        }
    },
    name: "js/main",
    dir: 'dist/',
    mainConfigFile: 'public/js/main.js',
    optimizeCSS: 'standard'
})