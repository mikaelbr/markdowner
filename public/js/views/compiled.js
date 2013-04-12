define(['backbone', 'underscore', 'jquery', 'vent', 'marked'], function (Backbone, _, $, vent, marked) {

  var tagsToReplace = {
    '<': '&lt;',
    '>': '&gt;'
  };

  function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
  }

  function sanitize(str) {
    return str.replace(/[&<>]/g, replaceTag);
  }

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
        langPrefix: 'language-'
        // highlight: function(code, lang) {
        //   if (lang === 'js') {
        //     return highlighter.javascript(code);
        //   }
        //   return code;
        // }
      });
      this.$el.find('.compiled').hide();
      vent.on('compiled:render', this.setOutput, this);
    },

    setOutput: function (fileModel, inputModel) {

      if (fileModel.get('remark')) {
        return this.setRemark(fileModel, inputModel);
      }

      this.$el.find('.weak-text').remove();
      var $inEl = this.$el.find('.compiled');
      if (!$inEl.length) {
        $inEl = $(this.mdWrapper).appendTo(this.$el);
        this.$el.find('.remark-preview').remove();
      }

      var input = typeof(inputModel) === "string" ? inputModel : inputModel.get('body');
      var md = marked(input);
      $inEl.html(md).show();
    },

    setRemark: function (fileModel, inputModel) {
      this.$el.find('.weak-text').remove();

      var $inEl = this.$el.find('.remark-preview');
      if (!$inEl.length) {
        $inEl = $(this.rmWrapper).attr('src', '/document/' + fileModel.get('_id')).appendTo(this.$el);
        return this.$el.find('.compiled').remove();
      }

      // Check if it is the same document.
      var currentID = $inEl.attr('src').replace('/document/', '');
      if (currentID !== fileModel.get('_id')) {
        return $inEl.attr('src', '/document/' + fileModel.get('_id'));
      }

      // A simple refersh. Re-compile Remark document.
      this.refreshIFrame($inEl[0], fileModel, inputModel);
    },

    refreshIFrame: function (iframe, fileModel, inputModel) {

      var text = typeof(inputModel) === "string" ? inputModel : inputModel.get('body'),
          isStyling = typeof(inputModel) === "string" ? false : inputModel.isStyling,
          id = fileModel.get('_id');

      if (isStyling) {
        // Update styling...
        var link = $(iframe.contentWindow.document).find('link'),
            newUrl = '/document/' + id + '.css'

        return link.attr('href', newUrl);
      }

      iframe.contentWindow.remark && iframe.contentWindow.remark.loadFromString(sanitize(text));
    }

  });

});