define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        urlRoot: '/api/document',
        idAttribute: 'file_id'
    });
});