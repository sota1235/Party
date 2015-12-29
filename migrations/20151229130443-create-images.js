/**
 * Create table for images
 */
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('images', {
    image_id: { type: 'int', primarykey: true },
    name: 'string',
    file_name: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('images', callback);
};
