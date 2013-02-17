var async = require('async')
  , store = require('../lib/store')
  , structure = require('../lib/folderHierarchy');

/*
 * GET home page.
 */

exports.index = function(req, res){

  var user = req.user
    , activeDocumentId = user.settings.activeDocument.file_id;

  async.series({
    folders: function (done) {
      structure.list(user._id, function (err, list) {
        done(err, list);
      });
    }

    , doc: function (done) {
      if (!activeDocumentId) done(null, null);

      store.get(req.params.document, function (err, item) {
        done(err, item);
      });
    }

  }

  , function (err, res) {
    res.render('index', { 
      title: 'Markdowner' 
    , user: user
    , folders: res.folders
    , documents: res.doc
    });
  });
};