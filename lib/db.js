var config = require('config').MongoJS,
    mongojs = require('mongojs');

var DB = function () {
    // we can also provide some credentials
    this.db = mongojs(config.connect_url, ['documents', 'folders', 'users', 'beta', 'wish']);
    this.documents = this.db.documents;
    this.folders = this.db.folders;
    this.users = this.db.users;
    this.betaList = this.db.beta;
    this.wishList = this.db.wish;

    this.wishList.ensureIndex( { "username": 1 }, { unique: true } );
};

DB.prototype.ObjectId = function(id) {
  return mongojs.ObjectId(id);
}

module.exports = new DB();