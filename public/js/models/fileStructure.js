define(['backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Model.extend({
        urlRoot: 'api/structure',
        idAttribute: '_id',

        validate: function (attrs) {
            if (attrs.type === 0 && typeof attrs.expanded === 'undefined') {
                return 'A folder needs to have the expanded property';
            }

            if (attrs.name === null || !attrs.name || !$.trim(attrs.name)) {
                return 'A name is required';
            }
        }
    });
});