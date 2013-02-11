define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        urlRoot: '/api/user',
        idAttribute: '_id'
    });
});