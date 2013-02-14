var md = require('marked'),
    less = require('less');
var store = require('../lib/store'),
    user = require('../lib/user'),
    structure = require('../lib/folderHierarchy');

md.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  // highlight: function(code, lang) {
  //   if (lang === 'js') {
  //     return highlighter.javascript(code);
  //   }
  //   return code;
  // }
});

exports.index = function(req, res){
  var id = req.params.document;
  structure.get(id, function (err, file) {
    if (!file || file.type === 0 || !file.public) {
      res.status(404);
      res.render('error/404', {
          title: 'Not found'
      });
      return;
    }
    var user_id = file.user_id;

    var view = file.remark ? 'remark' : 'document';

    user.get({'_id': user_id}, function (err, user) {
      store.get(id, function(err, data) {
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
    
};

exports.style = function(req, res){
  console.log('STYYYLE', req.params.document);
  var id = req.params.document;
  structure.get(id, function (err, file) {

    console.log(file);

    if (!file || file.type < 2 || !file.public || !file.remark) {
        res.status(404);
        res.render('error/404', {
            title: 'Not found'
        });
        return;
    }

    console.log()

    store.get(id, function(err, data) {
      console.log(data);
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
}
