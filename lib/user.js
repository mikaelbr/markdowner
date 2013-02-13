var db = require('./db');

var UserStorage = function () {
    this.col = db.users;
    this.betaList = db.betaList;
    this.wishList = db.wishList;
    this.isBeta = false;
};

UserStorage.prototype.list = function(cb) {
  this.col.find(function (err, res) {
    if (err) return cb(err, res);
    cb(null, (res));
  });
  return this;
};

UserStorage.prototype.get = function(query, cb) {
  this.col.findOne(query, function (err, res) {
    if (err) return cb(err, res);
    cb(null, res);
  });
  return this;
};

UserStorage.prototype.getOrCreate = function(query, obj, cb, passedBeta) {
  var self = this;
  if (this.isBeta && !passedBeta) {
    return this.isBetaInvited(obj.twitterObj.username, function (err, data) {
      if (err || !data) {
        return cb('User ' + obj.twitterObj.username + ' has not been invited for the Beta.', null);
      }
      return self.getOrCreate(query, obj, cb, true);
    });
  }

  return this.get(query, function (err, data) {
    if (data) { 
      cb(null, data);
      return;
    }
    self.insert(obj, cb);
  });
};

UserStorage.prototype.delete = function(id, cb) {
  this.col.remove({id: id}, true, cb);
  return this;
};

UserStorage.prototype.save = function(item, cb) {
  var id = item._id;
  delete item._id;
  this.col.update({_id: db.ObjectId(id)}, item, function (err, data) {
    item._id = id;
    cb(err, data);
  });
  return this;
};

UserStorage.prototype.insert = function(item, cb) {
  this.col.save(item, cb);
  return this;
};


/****
 *  Beta Handling
 ***/
UserStorage.prototype.isBetaInvited = function (username, cb) {
  this.betaList.findOne({ username: username }, cb);
  return this;
};

UserStorage.prototype.listBetaInvitees = function (cb) {
  this.betaList.find(cb);
  return this;
};

UserStorage.prototype.betaUninvite = function (id, cb) {
  this.betaList.remove({ _id: db.ObjectId(id) }, cb);
  return this;
};

UserStorage.prototype.betaInvite = function (username, cb) {
  this.betaList.save({ username: username }, cb);
  return this;
};

UserStorage.prototype.setBeta = function(isBeta) {
  this.isBeta = isBeta;
};



// Wish list
UserStorage.prototype.betaWish = function (username, cb) {
  this.wishList.save({ username: username, date: new Date() }, cb);
  return this;
};

UserStorage.prototype.betaRemoveWish = function (id, cb) {
  this.wishList.remove({ _id: db.ObjectId(id) }, cb);
  return this;
};

UserStorage.prototype.listWish = function (cb) {
  this.wishList.find(cb);
  return this;
};

/****
 *  // Beta Handling
 ***/

module.exports = new UserStorage();