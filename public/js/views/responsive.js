define(['backbone', 'jquery', 'vent', 'jRespond'], function (Backbone, $, vent, jRespond) {

    // call jRespond and add breakpoints
    var jRes = jRespond([
        {
            label: 'small',
            enter: 0,
            exit: 979
        },{
            label: 'large',
            enter: 768,
            exit: 10000
        }
    ]);


    return Backbone.View.extend({
        el: "document",

        initialize: function () {
            // register enter and exit functions for multiple breakpoints
            jRes.addFunc({
                breakpoint: ['small'],
                enter: function() {
                    $("#compiled, #file-settings").hide();
                },
                exit: function() {
                    console.log("Exit dektop")
                }
            });

            // register enter and exit functions for multiple breakpoints
            jRes.addFunc({
                breakpoint: ['large'],
                enter: function() {
                    $("#editor").show();
                    $("#compiled, #file-settings").show();
                },
                exit: function() {
                    
                }
            });
        },



    });

});