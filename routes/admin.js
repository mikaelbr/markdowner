var user = require('../lib/user');



var index = function(req, res) {
    
    user.listBetaInvitees(function (err, invitees) {
        user.listWish(function (err, wishlist) {
            res.render('admin/beta', {
                title: 'Admin - Beta Invites',
                invitees: invitees,
                wishlist: wishlist
            })
        });
    });
    
};


var remove = function (req, res) {
    var user_id = req.params.userid;
    user.betaUninvite(user_id, function (err, data) {
        res.redirect('/admin');
    });
};

var removeWish = function (req, res) {
    var user_id = req.params.userid;
    user.betaRemoveWish(user_id, function (err, data) {
        res.redirect('/admin');
    });
};


var add = function (req, res) {
    var username = req.body.username;
    if (!username) {
        res.redirect('/admin');
    }
    user.betaInvite(username, function() {
        res.redirect('/admin');
    });
};


var approve = function (req, res) {
    var username = req.params.username,
        userid = req.params.userid;
    if (!username) {
        res.redirect('/admin');
    }

    user.betaInvite(username, function() {
        user.betaRemoveWish(userid, function (err, data) {
            res.redirect('/admin');
        });
    });
};

var wish = function (req, res) {
    var username = req.body.username;
    if (!username) {
        res.redirect('/');
    }
    user.betaWish(username, function(err, data) {
        if(!err) {
            req.flash('info', 'Beta invite requested!');
        } else {
            req.flash('error', err);
        }
        res.redirect('/');
    });
};


exports.connect = function (app, auth) {
    app.get('/admin', auth.ensureAdminAuthenticated, index);
    app.post('/admin', auth.ensureAdminAuthenticated, add);
    app.get('/admin/:userid', auth.ensureAdminAuthenticated, remove);
    app.get('/admin/wish/remove/:userid', auth.ensureAdminAuthenticated, removeWish);
    app.get('/admin/wish/approve/:username/:userid', auth.ensureAdminAuthenticated, approve);
    app.post('/wish', wish);
}