
/**
 * Module dependencies.
 */

var express = require('express')
  , connect = require('connect')
  , routes = require('./routes')
  , documentRoute = require('./routes/document')
  , userRoute = require('./routes/user')
  , adminRoute = require('./routes/admin')
  , resource = require('express-resource')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express()
  , auth = require('./auth');

auth.connect();

var oneYear = 31557600000;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.cookieParser('DSAKDKLSNkdnsakjndskajndkjsandsa____D:Sd.sa,dsds'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ 
    secret: 'ndsk____D:Sdajndkj____D:Sdsandsa____D:Sd.sa,dsds', 
    cookie: { 
      expires: false, 
      maxAge: 365 * 24 * 60 * 60 * 1000 
    } 
  }));
  
  auth.configure(app);

  app.use(flash());

  app.use(app.router);


  app.use(function(err, req, res, next){
    console.error(err);
    res.render('error/500', {
      title: "Error",
      status: err.status || 500,
      error: err
    });
  });

});

app.configure('production', function(){
  app.use(connect.compress());
  app.use(require('less-middleware')({ src: __dirname + '/dist' }));
  app.use(express.static(path.join(__dirname, 'dist'), { maxAge: oneYear }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});


app.get('/', auth.ensureAuthenticated, routes.index);
app.get('/document/:document.:format?', documentRoute.index);
app.get('/user/:user.:format?', userRoute.index);
adminRoute.connect(app, auth);

// JSON API
// Ensure Auth on API
app.all('/api*', auth.ensureAPIAuthenticated);
var doc = app.resource('api/document', require('./models/document'), { format: 'json' });
var struct = app.resource('api/structure', require('./models/structure'), { format: 'json' });
var user = app.resource('api/user', require('./models/user'));


app.get('/login', function (req, res) {
  res.render('login', {
    title: 'Markdowner',
    user: req.user,
    infoMsg: req.flash('info'),
    errorMsg: req.flash('error')
  });
});

auth.routes(app);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

