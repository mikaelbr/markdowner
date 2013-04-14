var async = require('async'),
    apiUtils = require('../lib/apiUtils');

var documents = require('../lib/documents'),
    userLib = require('../lib/user'),
    files = require('../lib/files');

var zipDocumentList = function (loggedInUserId, user, folders, documents) {

  var documentList = [];
  documents.forEach(function (e) {
    if (e && e.file_id) {
      var f_id = e.file_id.toString();
      documentList[f_id] = e;
    }
  });

  var result = [];
  folders.forEach(function(file) {
    var user_id = file.user_id;

    if ((!file['public'] && loggedInUserId != user_id)) {
      return;
    }
    var doc = documentList[file._id.toString()];

    if (!doc) {
      return;
    }

    result.push(apiUtils.cleanTotal(doc, user, file));
  });

  return result;
};

var getDocumentList = function (user, loggedInUser, cb) {
  var loggedInUserId = 0;
  if(loggedInUser && loggedInUser._id) {
    loggedInUserId = loggedInUser._id.toString();
  }

  async.parallel({
    files: function (done) {
      var query = {
        "user_id": files.db.ObjectId(user._id.toString()),
        "public": true
      };

      // If showing own profile, show all...
      if (loggedInUserId == user._id) {
        delete query['public'];
      }

      files.find(query, done);
    },
    documents: function (done) {
      documents.find({ "user_id": documents.db.ObjectId(user._id.toString()) }, done);
    }
  }, function (err, results) {
    if (err || !results.files || !results.documents) {
      return cb(err || "No results", null);
    }
    var data = zipDocumentList(loggedInUserId, user, results.files, results.documents);
    cb(err, data);
  });
};

exports.renderUser = function (req, res) {
  var id = req.params.user;

  userLib.get({  "twitterObj.username": id }, function (err, user) {
    // Found user?
    if (err || !user) { 
      res.status(404);
      res.render('error/404', {
          title: 'Not found'
      });
      return;
    }

    getDocumentList(user, req.user, function (err, result) {

      // Found user?
      if (err) { 
        res.status(404);
        res.render('error/404', {
            title: 'Not found'
        });
        return;
      }

      var slideshows = [],
          documents = [];

      result.forEach(function (item) {
        if (item.remark) {
          slideshows.push(item);
        } else {
          documents.push(item);
        }
      });



      res.render('profile', {
        title: "User Profile: " + user.twitterObj.username,
        user: user,
        loggedInUser: req.user,
        slideshows: slideshows,
        documents: documents
      });
    });

  });
}

exports.json = function (req, res) {
  var id = req.params.user;


  userLib.get({  "twitterObj.username": id }, function (err, user) {
    // Found user?
    if (err) { 
      res.json(404, {
          msg: 'Not found'
      });
      return;
    }

    getDocumentList(user, req.user, function (err, result) {
      if (err) {
        return res.json(404, {
          error: err
        });
      }

      res.json(result);
    });
  });
}

exports.index = function (req, res) {

  if (req.params.format === 'json') {
    return exports.json(req, res);
  }

  exports.renderUser(req, res);
};

