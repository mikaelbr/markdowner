var jam = {
    "packages": [
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
    "version": "0.2.13",
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
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
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
    }
});
}
else {
    var require = {
    "packages": [
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
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}