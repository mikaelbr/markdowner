var md = require("node-markdown").Markdown;
var store = require('../lib/store'),
    user = require('../lib/user'),
    structure = require('../lib/folderHierarchy');


exports.index = function(req, res){
    var id = req.params.document;
    structure.get(id, function (err, file) {
        if (!file || file.type === 0 || !file.public) {
            res.status(404);
            res.render('404', {
                title: 'Not found'
            });
            return;
        }
        var user_id = file.user_id;

        user.get({'_id': user_id}, function (err, user) {
            store.get(id, function(err, data) {
                res.render('document', { 
                    title: file.name, 
                    doc: data,
                    md:md,
                    user: user,
                    file: file
                });
            });
        })
    });
    
};