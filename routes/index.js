var async = require('async')
  , docs = require('../lib/documents')
  , files = require('../lib/files');

/*
 * GET home page.
 */

exports.index = function(req, res){

  var user = req.user
    , activeDocumentId
    , activeDocument;
  if (user.settings && user.settings.activeDocument) {
    activeDocument = user.settings.activeDocument;
    activeDocumentId = activeDocument._id;
  }

  async.parallel({
    folders: function (done) {
      files.list(user._id, function (err, list) {
        done(err, list);
      });
    }

    , doc: function (done) {
      if (!activeDocumentId) done(null, null);

      docs.get(activeDocumentId, function (err, item) {
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
    , fileModel: activeDocument || null
    , startup: !result.folders || result.folders.length < 1 || !result.doc
    });
  });
};