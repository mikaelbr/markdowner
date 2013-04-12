var _ext = require('util')._extend;

var cleanUser = exports.cleanUser = function (user) {
  var userClone = _ext({}, user);

  userClone.username = userClone.twitterObj.username;
  delete userClone.twitterObj; 
  delete userClone.settings.activeDocument; 
  delete userClone.admin; 
  delete userClone.settings; 

  return userClone;
};

var cleanFile = exports.cleanFile = function (file) {
  file = _ext({}, file);

  delete file.user_id; 
  delete file['selected']; 
  delete file.remark; 

  return file;
};

var cleanDocument = exports.cleanDocument = function (doc) {
  doc = _ext({}, doc);

  delete doc.user_id;
  delete doc.file_id;

  return doc;
};

exports.cleanTotal = function (doc, user, file) {
  doc = cleanDocument(doc);

  doc.user = cleanUser(user);
  doc.file = cleanFile(file);

  doc.remark = file.type > 1;
  return doc;
};
