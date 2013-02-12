define(['underscore', 'backbone'], function(_, Backbone){
    var instance = {};
 
    _.extend(instance, Backbone.Events);

    var getInstance = function(){
        return instance;
    };
 
    return getInstance();
});