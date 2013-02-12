
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Markdowner', user: req.user });
};