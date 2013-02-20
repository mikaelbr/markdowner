var inherits = require('util').inherits
  , Storage = require('./storage');

var FileStorage = function () {
  Storage.call(this);
  this.col = this.db.folders;
  this._stdField = '_id';
};

inherits(FileStorage, Storage);

var constructHierarchy = function (list) {
  if (!list.length) return list;
  var structure = {}, item;
  for (var i = 0, len = list.length; i < len; i++) {
    item = list[i];

    if (item.parentId) {
      if (!structure[item.parentId]) {
        structure[item.parentId] = { children: [] };
      }

      structure[item.parentId].children.push(item);
    } else {
      if (!structure[item._id]) {
        structure[item._id] = item;

        if (item.type == 0) {
          structure[item._id].children = [];
        }
      } else {
        structure[item._id].name = item.name;
        structure[item._id]._id = item._id;
        structure[item._id].type = item.type;
        structure[item._id].user_id = item.user_id;
      }
    }
    
  };

  return structure;

};

FileStorage.prototype.getTree = function(userId, cb) {
  this.col.find({user_id: userId}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, constructHierarchy(res));
  });
  return this;
};

module.exports = new FileStorage();