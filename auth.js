var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = require('./lib/user')
  , confB = require('config')
  , conf = confB.Auth
  , callbackUrl = confB.Site.callback
  , db = require('./lib/db');

exports.configure = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
};

var twitterConnect = function () {
  passport.use(new TwitterStrategy({
      consumerKey: conf.twit.consumerKey,
      consumerSecret: conf.twit.consumerSecret,
      callbackURL: callbackUrl
    },
    function(token, tokenSecret, profile, done) {
      var twitObj = {
        twitter_id: profile.id,
        twitterObj: profile
      };
      User.getOrCreate({twitter_id: profile.id}, twitObj, function (err, user) {
        done(err, user);
      });
    }
  ));
};


exports.connect = function () {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.get({_id: db.ObjectId(id)}, function(err, user) {
      done(err, user);
    });
  });

  twitterConnect();
};

exports.routes = function (app) {

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', 
      passport.authenticate('twitter', { successRedirect: '/',
                                         failureRedirect: '/login' }));

    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
    });
};

exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};

exports.ensureAPIAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.json(401, {
    error: {
      msg: 'Authentification needed.',
      code: 401
    }
  });
};