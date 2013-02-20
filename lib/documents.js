var inherits = require('util').inherits
  , Storage = require('./storage');

var DocumentStorage = function () {
  Storage.call(this);
  this.col = this.db.documents;
  this._stdField = 'file_id';
};

inherits(DocumentStorage, Storage);

module.exports = new DocumentStorage();