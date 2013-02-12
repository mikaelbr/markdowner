
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , documentRoute = require('./routes/document')
  , resource = require('express-resource')
  , http = require('http')
  , path = require('path');

var app = express()
  , auth = require('./auth');

auth.connect();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  auth.configure(app);
  app.use(app.router);

});

app.configure('production', function(){
  app.use(require('less-middleware')({ src: __dirname + '/dist' }));
  app.use(express.static(path.join(__dirname, 'dist')));
});

app.configure('development', function(){
  app.use(express.errorHandler());

  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});




app.get('/', auth.ensureAuthenticated, routes.index);
app.get('/document/:document', documentRoute.index);

// JSON API
// Ensure Auth on API
app.all('/api*', auth.ensureAPIAuthenticated);
var doc = app.resource('api/document', require('./models/document'), { format: 'json' });
var struct = app.resource('api/structure', require('./models/structure'), { format: 'json' });
var user = app.resource('api/user', require('./models/user'));


app.get('/login', function (req, res) {
  res.render('login', {
    title: 'Markdowner',
    user: req.user
  });
});

auth.routes(app);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

