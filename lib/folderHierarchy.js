var db = require('./db');

var FileHierarchy = function () {
    this.col = db.folders;
};

// // testdata 
// var testStructure = [
//   {_id: '1', name: 'File 1', parentId: 2, type: 1, user_id: 1},
//   {_id: '2', name: 'Folder 1', parentId: null, type: 0, user_id: 1},
//   {_id: '3', name: 'File 2', parentId: 2, type: 1, user_id: 1},
//   {_id: '4', name: 'File 3', parentId: null, type: 1, user_id: 1},
//   {_id: '5', name: 'File 4', parentId: null, type: 1, user_id: 1},
//   {_id: '6', name: 'File 5', parentId: 2, type: 1, user_id: 1},
//   {_id: '7', name: 'Folder 2', parentId: null, type: 0, user_id: 1},
//   {_id: '8', name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   {_id: '9', name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   {_id: '10', name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   {_id: '11', name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   {_id: '12', name: 'File 1', parentId: 7, type: 1, user_id: 1}
// ];

// // testdata 
// var testStructure = [
//   {name: 'File 1', parentId: 2, type: 1, user_id: 1},
//   {name: 'Folder 1', parentId: null, type: 0, user_id: 1},
//   {name: 'File 2', parentId: 2, type: 1, user_id: 1},
//   {name: 'File 3', parentId: null, type: 1, user_id: 1},
//   {name: 'File 4', parentId: null, type: 1, user_id: 1},
//   {name: 'File 5', parentId: 2, type: 1, user_id: 1},
//   {name: 'Folder 2', parentId: null, type: 0, user_id: 1},
//   {name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   {name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   { name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   { name: 'File 1', parentId: 7, type: 1, user_id: 1},
//   { name: 'File 1', parentId: 7, type: 1, user_id: 1}
// ];

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

FileHierarchy.prototype.getTree = function(userId, cb) {
  this.col.find({user_id: userId}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, constructHierarchy(res));
  });
  return this;
};

FileHierarchy.prototype.list = function(userId, cb) {
  this.col.find({user_id: userId}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, (res));
  });
  return this;
};


FileHierarchy.prototype.get = function(id, cb) {
  this.col.findOne({_id: db.ObjectId(id)}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, res);
  });
  return this;
};

FileHierarchy.prototype.delete = function(id, userId, cb) {
  this.col.remove({_id: db.ObjectId(id), user_id: userId}, true, cb);
  return this;
};

FileHierarchy.prototype.add = function(item, cb) {
  this.save(item);
  this.get(item.user_id, cb);
  return this;
};

FileHierarchy.prototype.save = function(item, cb) {
  var _id = item._id;
  delete item._id;
  item.user_id = db.ObjectId(item.user_id);
  this.col.update({_id: db.ObjectId(_id)}, item, { upsert: true }, function (err, data) {
    item._id = _id;
    cb(err, data);
  });
  return this;
};

FileHierarchy.prototype.insert = function(item, cb) {
  this.col.save(item, cb);
  return this;
};

module.exports = new FileHierarchy();