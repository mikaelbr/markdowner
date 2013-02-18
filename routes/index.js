var async = require('async')
  , store = require('../lib/store')
  , structure = require('../lib/folderHierarchy');

/*
 * GET home page.
 */

exports.index = function(req, res){

  var user = req.user
    , activeDocumentId;
  if (user.settings && user.settings.activeDocument) {
    activeDocumentId = user.settings.activeDocument._id;
  }

  async.series({
    folders: function (done) {
      structure.list(user._id, function (err, list) {
        done(err, list);
      });
    }

    , doc: function (done) {
      if (!activeDocumentId) done(null, null);

      store.get(activeDocumentId, function (err, item) {
        done(err, item);
      });
    }
  }

  , function (err, result) {
    res.render('index', { 
      title: 'Markdowner' 
    , user: user
    , folders: result.folders
    , documents: result.doc
    , fileModel: user.settings.activeDocument
    , startup: !result.folders || result.folders.length < 1 || !result.doc
    });
  });
};