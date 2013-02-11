define(['backbone', 
        'underscore', 
        'jquery', 
        'vent', 
        'text!/templates/menu/themes.html',
        'keymaster',
        'js/libs/jquery.fullscreen'
    ],  function (Backbone, _, $, vent, ThemesTemplate, key) {

    var themes =  {
        "bright": {
            "chrome": "Chrome",
            "clouds": "Clouds",
            "crimson_editor": "Crimson Editor",
            "dawn": "Dawn",
            "dreamweaver": "Dreamweaver",
            "eclipse": "Eclipse",
            "gitHub": "GitHub",
            "solarized_light": "Solarized Light",
            "textmate": "TextMate",
            "tomorrow": "Tomorrow",
            "xcode": "XCode"
        },
        "dark": {
            "ambiance": "Ambiance",
            "chaos": "Chaos",
            "clouds_midnight": "Clouds Midnight",
            "cobalt": "Cobalt",
            "idle_fingers": "idleFingers",
            "kr_theme": "krTheme",
            "merbivore": "Merbivore",
            "merbivore_soft": "Merbivore Soft",
            "mono_industrial": "Mono Industrial",
            "monokai": "Monokai",
            "pastel_on_dark": "Pastel on dark",
            "solarized_dark": "Solarized Dark",
            "twilight": "Twilight",
            "tomorrow_night": "Tomorrow Night",
            "tomorrow_night_blue": "Tomorrow Night Blue",
            "tomorrow_night_bright": "Tomorrow Night Bright",
            "tomorrow_night_eighties": "Tomorrow Night 80s",
            "vibrant_ink": "Vibrant Ink"
        }
    };

    return Backbone.View.extend({
        el: '#top-nav',

        initialize: function () {
            this.render();
            this.bindKeyMaster();
        },

        themeTemplate: _.template(ThemesTemplate),

        events: {
            'click #newfile': 'newfile',
            'click #newfolder': 'newfolder',
            'click #compile-button': 'compile',
            'click #theme-button': 'setThemeHeight',
            'click #fullscreen-button': 'toggleFullScreen',
            'click #themelist a': 'changeTheme',
            'click #file-options-button': 'fileOptions',
            'click #savefile': 'save',
            'click #toggle-sidebar': 'toggleSidebar',
            'click #toggle-horizontal': 'toggleHorizontal'
        },

        bindKeyMaster: function () {
            key('⌘+l, ctrl+l', $.proxy(this.newfile, this));
            key('⇧+⌘+l, ⇧+ctrl+l', $.proxy(this.newfolder, this));
            key('⌘+m, ctrl+m', $.proxy(this.compile, this));
            key('⌘+s, ctrl+s', $.proxy(this.save, this));
            key('⌘+k, ctrl+k', $.proxy(this.toggleSidebar, this));
        },

        fileOptions: function (e) {
            e.preventDefault();
            vent.trigger('editor:currentEditorFileOptions');
            return false;
        },

        toggleSidebar: function (e) {
            e.preventDefault();
            vent.trigger('sidebar:toggle');
            return false;
        },

        toggleHorizontal: function (e) {
            e.preventDefault();
            vent.trigger('editor:toggleHorizontal');
            return false;
        },

        toggleFullScreen: function (e) {
            e.preventDefault();
            $('html').toggleFullScreen();
            return false;
        },

        newfile: function (e) {
            e.preventDefault();
            vent.trigger('sidebar:newfile');
            return false;
        },
        
        save: function (e) {
            e.preventDefault();
            vent.trigger('editor:saveDocument');
            return false;
        },

        newfolder: function (e) {
            console.log('heer');
            e.preventDefault();
            vent.trigger('sidebar:newfolder');
            return false;
        },

        setThemeHeight: function (e) {
            var themelist = this.$el.find('#themelist');
            themelist.css({
                'max-height': $(document).outerHeight() / 1.5
            });
        },

        changeTheme: function (e) {
            e.preventDefault();
            vent.trigger('editor:changeTheme', $(e.target).attr('data-theme'));
            return false;
        },

        render: function () {
            var themelist = this.$el.find('#themelist');
            themelist.empty();
            
            // Bright:
            themelist.append('<li class="nav-header">Bright</li>');
            themelist.append(this.themeTemplate({themes: themes.bright}));

            // Dark:
            themelist.append('<li class="nav-header">Dark</li>');
            themelist.append(this.themeTemplate({themes: themes.dark}));
            return this;
        },

        
        compile: function (e) {
            console.log('heer');
            vent.trigger('editor:compile');
            return false;
        }


    });

});