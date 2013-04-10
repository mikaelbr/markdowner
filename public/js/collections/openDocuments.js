
define(['backbone', 'underscore', 'jquery', 'js/models/document'], function (Backbone, _, $, DocumentModel) {
    var OpenDocumentsCollection = Backbone.Collection.extend({
        model: DocumentModel,

        initialize: function () {

        }
    });

    return new OpenDocumentsCollection();
});