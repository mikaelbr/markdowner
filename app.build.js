({
    baseUrl: "public",
    paths: {
        order: 'js/libs/requirejs-plugins/order',
        vent: 'js/vent',
        templates: 'templates'
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
        }
    },
    name: "js/main",
    dir: 'dist/',
    mainConfigFile: 'public/js/main.js',
    optimizeCSS: 'standard'
})