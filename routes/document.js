var md = require('marked'),
    less = require('less');

var documents = require('../lib/documents'),
    user = require('../lib/user'),
    files = require('../lib/files');

md.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-'
  // highlight: function(code, lang) {
  //   if (lang === 'js') {
  //     return highlighter.javascript(code);
  //   }
  //   return code;
  // }
});

exports.renderDocument = function (req, res) {
  var id = req.params.document;
  files.get(id, function (err, file) {
    if (!file || file.type === 0 || !file['public']) {
      res.status(404);
      res.render('error/404', {
          title: 'Not found'
      });
      return;
    }
    var user_id = file.user_id;

    var view = file.remark ? 'remark' : 'document';

    user.get({'_id': user_id}, function (err, user) {
      documents.get(id, function(err, data) {
        res.render(view, { 
          title: file.name, 
          doc: data,
          md: md,
          user: user,
          file: file,
          hasStyle: !!data.style
        });
      });
    });
  });
}

exports.json = function (req, res) {
  var id = req.params.document;
  files.get(id, function (err, file) {
    if (!file || file.type === 0 || !file['public']) {
      res.json(404, {
          msg: 'Not found'
      });
      return;
    }
    var user_id = file.user_id;
    var view = file.remark ? 'remark' : 'document';

    user.get({'_id': user_id}, function (err, user) {

      // Remove info from public API listing. 
      delete user.twitterObj; 
      delete user.settings.activeDocument; 
      delete user.admin; 

      documents.get(id, function(err, data) {
        data.user = user;
        data.file = file;
        res.json(data);
      });
    });
  });
}

exports.style = function(req, res){
  var id = req.params.document;
  files.get(id, function (err, file) {

    if (!file || file.type < 2 || !file['public'] || !file.remark) {
        res.status(404);
        res.render('error/404', {
            title: 'Not found'
        });
        return;
    }

    documents.get(id, function(err, data) {
      var lessData = data.style;

      less.render(lessData, function (e, css) {
        if (e) {
          res.status(e.status || 404);
          res.render('error/500', {
              title: e
          });
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(css);
        res.end();
      });
      
    });
    
  });
};


exports.index = function (req, res) {
  if (req.params.format === 'css') {
    return exports.style(req, res);
  }

  if (req.params.format === 'json') {
    return exports.json(req, res);
  }

  exports.renderDocument(req, res);
};

