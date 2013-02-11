var db = require('./db');

var UserStorage = function () {
    this.col = db.users;
};

UserStorage.prototype.list = function(cb) {
  this.col.find(function (err, res) {
    if (err) return cb(err, res);
    cb(null, (res));
  });
  return this;
}

UserStorage.prototype.get = function(query, cb) {
  this.col.findOne(query, function (err, res) {
    if (err) return cb(err, res);
    cb(null, res);
  });
  return this;
}

UserStorage.prototype.getOrCreate = function(query, obj, cb) {
  var self = this;
  return this.get(query, function (err, data) {
    if (data) { 
      console.log('Found user');
      cb(null, data);
      return;
    }
    console.log('inserting new');
    self.insert(obj, cb);
  });
}

UserStorage.prototype.delete = function(id, cb) {
  this.col.remove({id: id}, true, cb);
  return this;
};

UserStorage.prototype.save = function(item, cb) {
  var id = item._id;
  delete item._id;
  console.log({_id: id});
  console.log(item);
  this.col.update({_id: db.ObjectId(id)}, item, function (err, data) {
    item._id = id;
    cb(err, data);
  });
  return this;
};

UserStorage.prototype.insert = function(item, cb) {
  console.log('Inserting')
  this.col.save(item, cb);
  return this;
};

module.exports = new UserStorage();