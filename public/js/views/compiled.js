define(['backbone', 'underscore', 'jquery', 'vent', 'marked'], function (Backbone, _, $, vent, marked) {

    return Backbone.View.extend({
        el: '#compiled',

        mdWrapper: '<div class="compiled github" />',
        rmWrapper: '<iframe class="remark-preview" />',

        initialize: function () {
            marked.setOptions({
              gfm: true,
              tables: true,
              breaks: true,
              pedantic: false,
              sanitize: true,
              smartLists: true,
              langPrefix: 'language-',
              // highlight: function(code, lang) {
              //   if (lang === 'js') {
              //     return highlighter.javascript(code);
              //   }
              //   return code;
              // }
            });
            this.$el.find('.compiled').hide();
            vent.on('compiled:render', this.setOutput, this);
            vent.on('compiled:remark', this.setRemark, this);
        },

        setOutput: function (input) {
            this.$el.find('.weak-text').remove();
            var $inEl = this.$el.find('.compiled');
            if (!$inEl.length) {
                $inEl = $(this.mdWrapper).appendTo(this.$el);
                this.$el.find('.remark-preview').remove();
            }
            $inEl.html(marked(input)).show();
        },

        setRemark: function (fileModel) {
            this.$el.find('.weak-text').remove();

            var $inEl = this.$el.find('.remark-preview');
            if (!$inEl.length) {
                $inEl = $(this.rmWrapper).attr('src', '/document/' + fileModel.get('_id')).appendTo(this.$el);
                this.$el.find('.compiled').remove();
            } else {
                $inEl.attr('src', '/document/' + fileModel.get('_id'));
            }
        }

        

    });

});